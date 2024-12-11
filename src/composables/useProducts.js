import { useStorage } from './useStorage';

export function useProducts() {
  const storage = useStorage();
  const STORAGE_KEY = 'nostrmarket.products';

  const getProducts = () => {
    return storage.getItem(STORAGE_KEY, []);
  };

  const persistProducts = (products) => {
    storage.setItem(STORAGE_KEY, products);
    return products;
  };

  const addProduct = (product, products = getProducts()) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex((p) => p.id === product.id);

    if (index === -1) {
      updatedProducts.push(product);
    } else {
      updatedProducts[index] = product;
    }

    return persistProducts(updatedProducts);
  };

  const removeProduct = (productId, products = getProducts()) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    return persistProducts(updatedProducts);
  };

  const updateProducts = (products, stalls) => {
    // Filter out products that don't have a corresponding stall
    const validProducts = products.filter((product) =>
      stalls.some((stall) => stall.id === product.stall_id)
    );
    return persistProducts(validProducts);
  };

  const removeProductsByMerchant = (merchantPubkey, products = getProducts()) => {
    const updatedProducts = products.filter((p) => p.pubkey !== merchantPubkey);
    return persistProducts(updatedProducts);
  };

  const getProductsByStall = (stallId, products = getProducts()) => {
    return products.filter((p) => p.stall_id === stallId);
  };

  const getProductById = (productId, products = getProducts()) => {
    return products.find((p) => p.id === productId);
  };

  return {
    getProducts,
    persistProducts,
    addProduct,
    removeProduct,
    updateProducts,
    removeProductsByMerchant,
    getProductsByStall,
    getProductById
  };
}
