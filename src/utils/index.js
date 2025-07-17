/**
 * Utils index - re-export all utility functions
 */

export * from './validation.js';
export * from './formatting.js';
export * from './nostr.js';
export * from './crypto.js';

/**
 * Create a confirm dialog configuration object
 * @param {string} message - Dialog message
 * @returns {Object} - Quasar dialog configuration
 */
export function confirm(message) {
  return {
    message,
    ok: {
      flat: true,
      color: "primary",
    },
    cancel: {
      flat: true,
      color: "grey",
    },
  };
}