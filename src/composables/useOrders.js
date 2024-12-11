import { useQuasar } from 'quasar';
import { useRelays } from './useRelays';
import { useStorage } from './useStorage';

export function useOrders() {
  const $q = useQuasar();
  const { findRelaysForMerchant, publishEventToRelays } = useRelays();
  const storage = useStorage();

  const saveOrder = (pubkey, order) => {
    const key = `nostrmarket.orders.${pubkey}`;
    const existingOrders = storage.getItem(key, []);
    storage.setItem(key, existingOrders);
    return existingOrders;
  };

  const updateExistingOrder = (order, orderUpdate, eventCreatedAt) => {
    if (orderUpdate.type === 0) {
      return {
        ...order,
        ...orderUpdate,
        createdAt: eventCreatedAt,
        message: order.message || orderUpdate.message,
      };
    }
    return order.eventCreatedAt < eventCreatedAt
      ? { ...order, ...orderUpdate }
      : { ...orderUpdate, ...order };
  };

  const persistOrderUpdate = (pubkey, eventCreatedAt, orderUpdate, orders) => {
    const existingOrders = orders[pubkey] || [];
    const orderIndex = existingOrders.findIndex((o) => o.id === orderUpdate.id);

    if (orderIndex === -1) {
      const newOrder = {
        ...orderUpdate,
        eventCreatedAt,
        createdAt: eventCreatedAt,
      };
      existingOrders.unshift(newOrder);
    } else {
      const updatedOrder = updateExistingOrder(
        existingOrders[orderIndex],
        orderUpdate,
        eventCreatedAt
      );
      existingOrders.splice(orderIndex, 1, updatedOrder);
    }

    orders[pubkey] = existingOrders;
    saveOrder(pubkey, existingOrders);
    return { ...orders };
  };

  const placeOrder = async ({ event, order, cartId }, account, checkoutStall) => {
    if (!account?.privkey) {
      return { success: false, error: 'no-account' };
    }

    try {
      event.content = await NostrTools.nip04.encrypt(
        account.privkey,
        checkoutStall.pubkey,
        JSON.stringify(order)
      );

      event.id = NostrTools.getEventHash(event);
      event.sig = await NostrTools.signEvent(event, account.privkey);

      const merchantPubkey = event.tags
        .filter((t) => t[0] === "p")
        .map((t) => t[1]);

      const merchantRelays = findRelaysForMerchant(merchantPubkey[0]);
      const relayCount = await publishEventToRelays(event, merchantRelays);

      $q.notify({
        type: relayCount ? "positive" : "warning",
        message: relayCount
          ? `The order has been placed (${relayCount} relays)!`
          : "Order could not be placed",
      });

      return {
        success: true,
        relayCount,
        event,
        order
      };
    } catch (error) {
      console.warn(error);
      $q.notify({
        type: "warning",
        message: "Failed to place order!",
      });
      return { success: false, error };
    }
  };

  return {
    placeOrder,
    persistOrderUpdate
  };
}
