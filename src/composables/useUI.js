import { useStorage } from './useStorage';
import { useQuasar } from 'quasar';

export function useUI() {
  const storage = useStorage();
  const $q = useQuasar();

  const saveUIConfig = (config) => {
    storage.setItem('nostrmarket.marketplaceConfig', {
      ui: config
    });
  };

  const getUIConfig = () => {
    return storage.getItem('nostrmarket.marketplaceConfig', {
      ui: { darkMode: false }
    });
  };

  const updateDarkMode = (isDark) => {
    $q.dark.set(isDark);
    const config = getUIConfig();
    config.ui.darkMode = isDark;
    saveUIConfig(config.ui);
  };

  const showNotification = (message, type = 'positive') => {
    $q.notify({
      type,
      message
    });
  };

  const showConfirmDialog = (message, onConfirm, onCancel) => {
    $q.dialog({
      title: 'Confirm',
      message,
      cancel: true,
      persistent: true
    }).onOk(() => {
      if (onConfirm) onConfirm();
    }).onCancel(() => {
      if (onCancel) onCancel();
    });
  };

  return {
    saveUIConfig,
    getUIConfig,
    updateDarkMode,
    showNotification,
    showConfirmDialog
  };
}
