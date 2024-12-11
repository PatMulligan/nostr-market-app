import { useStorage } from './useStorage';
import { useRelays } from './useRelays';

export function useDirectMessages() {
  const storage = useStorage();
  const { findRelaysForMerchant, publishEventToRelays } = useRelays();

  const getDmEvents = (pubkey) => {
    return storage.getItem(`nostrmarket.dm.${pubkey}`) || {};
  };

  const noDmEvents = () => {
    const dms = storage.getAllKeys()
      .filter((key) => key.startsWith("nostrmarket.dm"));
    return dms.length === 0;
  };

  const sendDirectMessage = async (event, toPubkey, markets, defaultRelays = []) => {
    let relays = findRelaysForMerchant(toPubkey[0], markets);
    if (!relays?.length) {
      relays = [...defaultRelays];
    }
    return await publishEventToRelays(event, relays);
  };

  const persistDmEvent = (event, peerPubkey) => {
    const dms = storage.getItem(`nostrmarket.dm.${peerPubkey}`) || {
      events: [],
      lastCreatedAt: 0,
    };

    const existingEvent = dms.events.find((e) => e.id === event.id);
    if (existingEvent) return null;

    dms.events.push(event);
    dms.events.sort((a, b) => a.created_at - b.created_at);
    dms.lastCreatedAt = dms.events[dms.events.length - 1].created_at;
    dms.peerPubkey = peerPubkey;

    storage.setItem(`nostrmarket.dm.${peerPubkey}`, dms);
    return dms;
  };

  const handleStructuredDm = async (event, content) => {
    // Implementation depends on your DM structure
    // This is a placeholder for the structured DM handling logic
    try {
      const structuredContent = JSON.parse(content);
      // Handle different types of structured messages
      return {
        success: true,
        content: structuredContent
      };
    } catch (error) {
      console.warn('Failed to parse structured DM:', error);
      return {
        success: false,
        error
      };
    }
  };

  return {
    getDmEvents,
    noDmEvents,
    sendDirectMessage,
    persistDmEvent,
    handleStructuredDm
  };
}
