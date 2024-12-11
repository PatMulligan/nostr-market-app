import { useQuasar } from 'quasar';
import { useStorage } from './useStorage';

export function useShoppingCart() {
  const $q = useQuasar();
  const storage = useStorage();

  const saveCart = (cart) => {
    storage.setItem("nostrmarket.shoppingCarts", cart);
  };

  const addProductToCart = (item, shoppingCarts) => {
    let stallCart = shoppingCarts.find((s) => s.id === item.stall_id);
    if (!stallCart) {
      stallCart = {
        id: item.stall_id,
        products: [],
      };
      shoppingCarts.push(stallCart);
    }
    stallCart.merchant = item.pubkey;

    let product = stallCart.products.find((p) => p.id === item.id);
    if (!product) {
      product = { ...item, orderedQuantity: 0 };
      stallCart.products.push(product);
    }
    product.orderedQuantity = Math.min(
      product.quantity,
      item.orderedQuantity || product.orderedQuantity + 1
    );

    saveCart(shoppingCarts);

    $q.notify({
      type: "positive",
      message: "Product added to cart!",
    });

    return shoppingCarts;
  };

  const removeProductFromCart = (item, shoppingCarts) => {
    const stallCart = shoppingCarts.find((c) => c.id === item.stallId);
    if (stallCart) {
      stallCart.products = stallCart.products.filter(
        (p) => p.id !== item.productId
      );
      if (!stallCart.products.length) {
        shoppingCarts = shoppingCarts.filter((s) => s.id !== item.stallId);
      }
      saveCart(shoppingCarts);
    }
    return shoppingCarts;
  };

  const removeCart = (cartId, shoppingCarts) => {
    shoppingCarts = shoppingCarts.filter((s) => s.id !== cartId);
    saveCart(shoppingCarts);
    return shoppingCarts;
  };

  return {
    addProductToCart,
    removeProductFromCart,
    removeCart
  };
}
