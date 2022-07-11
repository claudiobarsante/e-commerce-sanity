import React, { createContext, useContext, useState } from 'react';
// -- Default values
import { cartContextDefaultValues } from './defaultValues';
// -- Types
import {
  CartContextData,
  CartProviderProps,
  CartStatus,
  ShowCartType
} from './types';

// -- Custom hooks
import { useProductQty, useManageCart } from '../cart/hooks';

const CartContext = createContext<CartContextData>(cartContextDefaultValues);

const CartProvider = ({ children }: CartProviderProps) => {
  const [showCart, setShowCart] = useState<ShowCartType>(CartStatus.INITIAL);

  const { qty, increaseQty, decreaseQty } = useProductQty();
  const {
    cartItems,
    onAddProductToCart,
    onRemoveProductFromCart,
    setCartItems,
    setTotalPrice,
    setTotalQuantities,
    toggleCartItemQuanitity,
    totalPrice,
    totalQuantities
  } = useManageCart();

  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        qty,
        increaseQty,
        decreaseQty,
        cartItems,
        onAddProductToCart,
        onRemoveProductFromCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        toggleCartItemQuanitity,
        totalPrice,
        totalQuantities
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
