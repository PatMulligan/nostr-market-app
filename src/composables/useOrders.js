import { useQuasar } from 'quasar';
import { useRelays } from './useRelays';

export function useOrders() {
  const $q = useQuasar();
  const { findRelaysForMerchant, publishEventToRelays } = useRelays();

  const placeOrder = async ({ event, order, cartId }, account, checkoutStall, markets) => {
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

      const merchantRelays = findRelaysForMerchant(merchantPubkey[0], markets);
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

  const persistOrderUpdate = (pubkey, eventCreatedAt, orderUpdate, orders) => {
    const existingOrders = orders[pubkey] || [];
    const orderIndex = existingOrders.findIndex((o) => o.id === orderUpdate.id);

    if (orderIndex === -1) {
      existingOrders.unshift({
        ...orderUpdate,
        eventCreatedAt,
        createdAt: eventCreatedAt,
      });
      orders[pubkey] = existingOrders;
      $q.localStorage.set(`nostrmarket.orders.${pubkey}`, existingOrders);
      return { ...orders };
    }

    let order = existingOrders[orderIndex];

    if (orderUpdate.type === 0) {
      order.createdAt = eventCreatedAt;
      order = {
        ...order,
        ...orderUpdate,
        message: order.message || orderUpdate.message,
      };
    } else {
      order =
        order.eventCreatedAt < eventCreatedAt
          ? { ...order, ...orderUpdate }
          : { ...orderUpdate, ...order };
    }

    existingOrders.splice(orderIndex, 1, order);
    orders[pubkey] = existingOrders;
    $q.localStorage.set(`nostrmarket.orders.${pubkey}`, existingOrders);
    return { ...orders };
  };

  return {
    placeOrder,
    persistOrderUpdate
  };
}
