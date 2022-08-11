import { Dispatch, SetStateAction } from 'react';
// -- Types
import { ProductType as ProductType } from 'components/Product/types';

export type ActionType = 'increase' | 'decrease';

export type CartProductType = {
  quantity: number;
} & ProductType;

export type CartStatus = 'initial' | 'show' | 'hidden';

export type CartContextData = {
  cartItems: CartProductType[];
  decreaseQty: () => void;
  increaseQty: () => void;
  onAddProductToCart: (product: ProductType, quantity: number) => void;
  onRemoveProductFromCart: (product: ProductType) => void;
  qty: number;
  setCartItems: Dispatch<SetStateAction<CartProductType[]>>;
  setShowCart: Dispatch<SetStateAction<CartStatus>>;
  setTotalPrice: (price: number) => void;
  setTotalQuantities: (qty: number) => void;
  showCart: CartStatus;
  updateCart: (product: CartProductType, cartAction: ActionType) => void;
  totalPrice: number;
  totalQuantities: number;
};

export type CartProviderProps = {
  children: React.ReactNode;
};
