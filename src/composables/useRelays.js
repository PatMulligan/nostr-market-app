import { useStorage } from './useStorage';

export function useRelays() {
  const storage = useStorage();

  const findRelaysForMerchant = (pubkey, markets) => {
    const merchantMarkets = markets.filter((m) =>
      m.merchants?.some((merchant) => merchant === pubkey)
    );
    return merchantMarkets.reduce(
      (relays, market) => [...relays, ...(market.relays || [])],
      []
    );
  };

  const publishEventToRelays = async (event, relays) => {
    if (!relays?.length) return 0;

    const publishPromises = relays.map((relay) =>
      window.pool
        .ensureRelay(relay)
        .publish(event)
        .then(() => true)
        .catch(() => false)
    );

    const results = await Promise.all(publishPromises);
    return results.filter(Boolean).length;
  };

  const handleNewRelay = async (relayUrl, market, relaysData) => {
    const relayKey = await toRelayKey(relayUrl);
    const updatedRelaysData = { ...relaysData };

    if (updatedRelaysData[relayKey]) {
      const relayData = updatedRelaysData[relayKey];
      const events = await relayData.relay.list([
        { kinds: [30017, 30018], authors: market.opts.merchants },
      ]);

      await processEvents(events, relayData);
      relayData.merchants = [
        ...new Set(relayData.merchants.concat(market.opts.merchants)),
      ];
      await requeryRelay(relayKey, relayData);
    } else {
      await loadRelayData(relayUrl, market.opts.merchants);
      await connectToRelay(relayKey);
    }

    return updatedRelaysData;
  };

  const handleRemovedRelay = async (relayUrl, markets, relaysData) => {
    const marketWithRelay = markets.find((m) =>
      m.relays.find((r) => r === relayUrl)
    );

    if (!marketWithRelay) {
      // relay no longer exists
      const relayKey = await toRelayKey(relayUrl);
      const updatedRelaysData = { ...relaysData };
      delete updatedRelaysData[relayKey];
      persistRelaysData(updatedRelaysData);
      return updatedRelaysData;
    }

    return relaysData;
  };

  // Helper functions remain in useRelays
  const toRelayKey = async (relayUrl) => {
    // Implementation needed
    return relayUrl;
  };

  const persistRelaysData = (relaysData) => {
    storage.setItem(
      "nostrmarket.relays",
      Object.values(relaysData)
        .filter((r) => !!r)
        .map((relayData) => ({
          lastEventAt: relayData.lastEventAt,
          relayUrl: relayData.relayUrl,
        }))
    );
  };

  return {
    findRelaysForMerchant,
    publishEventToRelays,
    handleNewRelay,
    handleRemovedRelay
  };
}
