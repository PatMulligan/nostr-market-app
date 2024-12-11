import { useRelays } from './useRelays';
import { useStorage } from './useStorage';

export function useMerchantManagement() {
  const storage = useStorage();
  const { publishEventToRelays } = useRelays();

  const handleNewMerchant = async (market, merchantPubkey, relaysData) => {
    const updatedRelaysData = { ...relaysData };

    for (const relayKey of Object.keys(updatedRelaysData)) {
      const relayData = updatedRelaysData[relayKey];
      if (!market.relays.includes(relayData.relayUrl)) continue;
      if (relayData.merchants.includes(merchantPubkey)) continue;

      const events = await relayData.relay.list([
        { kinds: [30017, 30018], authors: [merchantPubkey] },
      ]);
      await processEvents(events, relayData);

      relayData.merchants.push(merchantPubkey);
      await requeryRelay(relayKey, relayData);
    }

    return updatedRelaysData;
  };

  const handleRemoveMerchant = (merchantPubkey, markets, products, stalls) => {
    const marketWithMerchant = markets.find((m) =>
      m.opts.merchants.find((mr) => mr === merchantPubkey)
    );

    // other markets still have this merchant
    if (marketWithMerchant) {
      return { products, stalls };
    }

    // remove all products and stalls from that merchant
    return {
      products: products.filter((p) => p.pubkey !== merchantPubkey),
      stalls: stalls.filter((s) => s.pubkey !== merchantPubkey)
    };
  };

  const removeSubscriptionsForMerchant = async (merchantPubkey, relaysData) => {
    const updatedRelaysData = { ...relaysData };

    for (const relayKey of Object.keys(updatedRelaysData)) {
      const relayData = updatedRelaysData[relayKey];
      if (!relayData.merchants.includes(merchantPubkey)) continue;

      relayData.merchants = relayData.merchants.filter(
        (m) => m !== merchantPubkey
      );

      await requeryRelay(relayKey, relayData);
    }

    return updatedRelaysData;
  };

  return {
    handleNewMerchant,
    handleRemoveMerchant,
    removeSubscriptionsForMerchant
  };
}
