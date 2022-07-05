import { Dispatch, SetStateAction } from 'react';
// -- Types
import { ProductInfo as Product } from 'components/Product';

export enum ActionType {
  INCREASE_ITEM_QTY = 'inc',
  DECREASE_ITEM_QTY = 'dec'
}

export type CartProductType = {
  quantity: number;
} & Product;

export enum CartStatus {
  INITIAL = 'initial',
  SHOW = 'show',
  HIDDEN = 'hidden'
}
export type ShowCartType =
  | CartStatus.INITIAL
  | CartStatus.SHOW
  | CartStatus.HIDDEN;

export type CartContextData = {
  cartItems: CartProductType[];
  decreaseQty: () => void;
  increaseQty: () => void;
  onAddProductToCart: (product: Product, quantity: number) => void;
  onRemoveProductFromCart: (product: Product) => void;
  qty: number;
  setCartItems: Dispatch<SetStateAction<CartProductType[]>>;
  setShowCart: Dispatch<SetStateAction<ShowCartType>>;
  setTotalPrice: (price: number) => void;
  setTotalQuantities: (qty: number) => void;
  showCart: ShowCartType;
  toggleCartItemQuanitity: (
    product: CartProductType,
    cartAction: ActionType
  ) => void;
  totalPrice: number;
  totalQuantities: number;
};

export type CartProviderProps = {
  children: React.ReactNode;
};
