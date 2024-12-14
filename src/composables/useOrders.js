// TODO link persistOrderUpdate after creating persistance composable
//
import { useQuasar } from 'quasar'
import { useMarketStore } from '../stores/marketStore'
import { useShoppingCart } from '../composables/useShoppingCart'
import { useRelay } from '../composables/useRelay'
import { useStorage } from '../composables/useStorage'

export function useOrders() {
  const $q = useQuasar()
  const marketStore = useMarketStore()
  const shoppingCart = useShoppingCart()
  const relayService = useRelay()
  const storage = useStorage()

  const placeOrder = async ({ event, order, cartId }) => {
    if (!marketStore.account?.privkey) {
      marketStore.openAccountDialog();
      return;
    }
    try {
      marketStore.activeOrderId = order.id;
      event.content = await NostrTools.nip04.encrypt(
        marketStore.account.privkey,
        marketStore.checkoutStall.pubkey,
        JSON.stringify(order)
      );

      event.id = NostrTools.getEventHash(event);
      event.sig = await NostrTools.signEvent(event, marketStore.account.privkey);

      await sendOrderEvent(event);
      storage.persistOrderUpdate(
        marketStore.checkoutStall.pubkey,
        event.createdat,
        order
      );
      shoppingCart.removeCart(cartId);
      marketStore.setActivePage("shopping-cart-list");
    } catch (error) {
      console.warn(error);
      $q.notify({
        type: "warning",
        message: "Failed to place order!",
      });
    }
  }

  const sendOrderEvent = async (event) => {
    const merchantPubkey = event.tags
      .filter((t) => t[0] === "p")
      .map((t) => t[1]);

    const merchantrelayServices = relayService.findrelayServicesForMerchant(merchantPubkey[0]);
    const relayCount = await relayService.publishEventTorelayServices(event, merchantrelayServices);
    $q.notify({
      type: relayCount ? "positive" : "warning",
      message: relayCount
        ? `The order has been placed (${relayCount} relays)!`
        : "Order could not be placed",
    });
    marketStore.qrCodeDialog = {
      data: {
        paymentrequest: null,
        message: null,
      },
      dismissMsg: null,
      show: !!relayCount,
    };
  }

  const handlePaymentRequest = (json) => {
    if (json.id && json.id !== marketStore.activeOrderId) {
      // not for active order, store somewehre else
      return;
    }
    if (!json.paymentoptions?.length) {
      marketStore.qrCodeDialog.data.message = json.message || "Unexpected error";
      return;
    }

    const paymentRequest = json.paymentoptions.find(
      (o) => o.type == "ln"
    ).link;
    if (!paymentRequest) return;
    marketStore.qrCodeDialog.data.paymentrequest = paymentRequest;
    marketStore.qrCodeDialog.dismissMsg = $q.notify({
      timeout: 10000,
      message: "Waiting for payment...",
    });
  }

  const handleOrderStatusUpdate = (jsonData) => {
    if (jsonData.id && jsonData.id !== marketStore.activeOrderId) {
      // not for active order, store somewehre else
      return;
    }
    if (marketStore.qrCodeDialog.dismissMsg) {
      marketStore.qrCodeDialog.dismissMsg();
    }
    marketStore.qrCodeDialog.show = false;
    const message = jsonData.shipped
      ? "Order shipped"
      : jsonData.paid
        ? "Order paid"
        : "Order notification";
    $q.notify({
      type: "positive",
      message: message,
      caption: jsonData.message || "",
    });
  }

  const handleStructuredDm = async (event, peerPubkey) => {
    try {
      const jsonData = JSON.parse(event.content);
      if ([0, 1, 2].indexOf(jsonData.type) !== -1) {
        storage.persistOrderUpdate(peerPubkey, event.createdat, jsonData);
      }
      if (jsonData.type === 1) {
        handlePaymentRequest(jsonData);
      } else if (jsonData.type === 2) {
        handleOrderStatusUpdate(jsonData);
      }
    } catch (e) {
      console.warn("Unable to handle incoming DM", e);
    }
  }


  return {
    placeOrder,
  }
}