export function useRelays() {
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

  return {
    findRelaysForMerchant,
    publishEventToRelays
  };
}
