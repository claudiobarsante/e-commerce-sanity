import { CartStatus } from './types';

export const cartContextDefaultValues = {
  cartItems: [],
  decreaseQty: () => null,
  increaseQty: () => null,
  onAddProductToCart: () => null,
  onRemoveProductFromCart: () => null,
  qty: 0,
  setCartItems: () => null,
  setShowCart: () => null,
  setTotalPrice: () => null,
  setTotalQuantities: () => null,
  showCart: CartStatus.INITIAL,
  updateCart: () => null,
  totalPrice: 0,
  totalQuantities: 0
};
