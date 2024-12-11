import { useQuasar } from 'quasar';
import { copyToClipboard } from 'quasar';

export function useCopyText() {
  const $q = useQuasar();

  const copyText = async (text) => {
    try {
      await copyToClipboard(text);
      $q.notify({
        message: 'Copied to clipboard!',
        position: 'bottom'
      });
    } catch (err) {
      $q.notify({
        message: 'Failed to copy text',
        position: 'bottom',
        type: 'negative'
      });
    }
  };

  const copyUrl = () => {
    copyText(window.location);
  };

  return {
    copyText,
    copyUrl
  };
}
