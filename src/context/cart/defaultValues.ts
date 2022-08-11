import { CartContextData } from './types';

export const cartContextDefaultValues: CartContextData = {
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
  showCart: 'initial',
  updateCart: () => null,
  totalPrice: 0,
  totalQuantities: 0
};
