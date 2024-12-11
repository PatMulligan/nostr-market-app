import { useStorage } from './useStorage';

export function useMarketConfig() {
  const storage = useStorage();
  const MARKETS_KEY = 'nostrmarket.markets';

  const getMarkets = () => {
    return storage.getItem(MARKETS_KEY, []);
  };

  const persistMarkets = (markets) => {
    storage.setItem(MARKETS_KEY, markets);
    return markets;
  };

  const createMarket = async (account, defaultRelays = []) => {
    try {
      const market = {
        d: crypto.randomUUID(),
        pubkey: account?.pubkey || "",
        relays: [...defaultRelays],
        selected: true,
        opts: {
          name: "New Market",
          merchants: [],
          ui: {},
        },
      };

      const markets = getMarkets();
      markets.unshift(market);
      persistMarkets(markets);

      return { success: true, market };
    } catch (error) {
      console.warn(error);
      return { success: false, error };
    }
  };

  const addMarket = async (naddr) => {
    if (!naddr) return { success: false };

    try {
      const { type, data } = NostrTools.nip19.decode(naddr);
      if (type !== "naddr" || data.kind !== 30019) {
        return { success: false, error: 'invalid-naddr' };
      }

      const market = {
        d: data.identifier,
        pubkey: data.pubkey,
        relays: data.relays,
        selected: true,
      };

      const markets = getMarkets();
      markets.unshift(market);
      persistMarkets(markets);

      return { success: true, market };
    } catch (error) {
      console.warn(error);
      return { success: false, error };
    }
  };

  const updateMarket = async (market, existingMarket) => {
    try {
      const { d, pubkey } = market;

      const newMerchants = market.opts?.merchants.filter(
        (m) => !existingMarket.opts?.merchants.includes(m)
      );
      const removedMerchants = existingMarket.opts?.merchants.filter(
        (m) => !market.opts?.merchants.includes(m)
      );
      const newRelays = market.relays.filter(
        (r) => !existingMarket.relays.includes(r)
      );
      const removedRelays = existingMarket.relays.filter(
        (r) => !market.relays.includes(r)
      );

      const markets = getMarkets();
      const updatedMarkets = markets.filter(
        (m) => m.d !== d || m.pubkey !== pubkey
      );
      updatedMarkets.unshift(market);
      persistMarkets(updatedMarkets);

      return {
        success: true,
        newMerchants,
        removedMerchants,
        newRelays,
        removedRelays,
        markets: updatedMarkets
      };
    } catch (error) {
      console.warn(error);
      return { success: false, error };
    }
  };

  const deleteMarket = (market) => {
    try {
      const { d, pubkey } = market;
      const markets = getMarkets();
      const updatedMarkets = markets.filter(
        (m) => m.d !== d || m.pubkey !== pubkey
      );
      persistMarkets(updatedMarkets);

      return {
        success: true,
        markets: updatedMarkets,
        removedMerchants: market.opts?.merchants || [],
        removedRelays: market.relays || []
      };
    } catch (error) {
      console.warn(error);
      return { success: false, error };
    }
  };

  const toggleMarket = (markets) => {
    const allMarketsSelected = !markets.find((m) => !m.selected);
    persistMarkets(markets);
    return allMarketsSelected;
  };

  const toggleAllMarkets = (markets, allMarketsSelected) => {
    markets.forEach((m) => (m.selected = allMarketsSelected));
    persistMarkets(markets);
  };

  const publishNaddr = async (marketData, account, relays) => {
    if (!account?.privkey) {
      return { success: false, error: 'no-account' };
    }

    const identifier = marketData.d ?? crypto.randomUUID();
    const event = {
      kind: 30019,
      content: JSON.stringify(marketData.opts),
      created_at: Math.floor(Date.now() / 1000),
      tags: [["d", identifier]],
      pubkey: account.pubkey,
    };

    try {
      event.id = NostrTools.getEventHash(event);
      event.sig = await NostrTools.signEvent(event, account.privkey);

      const naddr = NostrTools.nip19.naddrEncode({
        pubkey: event.pubkey,
        kind: 30019,
        identifier: identifier,
        relays: marketData.relays,
      });

      return { success: true, event, naddr };
    } catch (error) {
      console.warn(error);
      return { success: false, error };
    }
  };

  const restoreFromStorage = () => {
    const markets = getMarkets();
    const allMarketsSelected = !markets.find((m) => !m.selected);
    const uiConfig = storage.getItem("nostrmarket.marketplaceConfig", {
      ui: { darkMode: false },
    });
    const sort = storage.getItem("nostrmarket.sort", {});

    return {
      markets,
      allMarketsSelected,
      uiConfig,
      sort
    };
  };

  return {
    getMarkets,
    persistMarkets,
    createMarket,
    addMarket,
    updateMarket,
    deleteMarket,
    toggleMarket,
    toggleAllMarkets,
    publishNaddr,
    restoreFromStorage
  };
}
