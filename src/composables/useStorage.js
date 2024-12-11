import { useQuasar } from 'quasar';

export function useStorage() {
  const $q = useQuasar();

  const setItem = (key, value) => {
    $q.localStorage.set(key, value);
  };

  const getItem = (key, defaultValue = null) => {
    return $q.localStorage.getItem(key) || defaultValue;
  };

  const getAllKeys = () => {
    return $q.localStorage.getAllKeys();
  };

  return {
    setItem,
    getItem,
    getAllKeys
  };
}
