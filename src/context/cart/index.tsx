import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react';
import { toast } from 'react-hot-toast';

// -- Types
import { ProductInfo as Product } from 'components/Product';

export enum ActionType {
  INCREASE_ITEM_QTY = 'inc',
  DECREASE_ITEM_QTY = 'dec'
}

export type CartProductType = {
  quantity: number;
} & Product;

export type ShowCartType = 'initial' | 'show' | 'hide';

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

const cartContextDefaultValues = {
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
  showCart: 'initial' as ShowCartType,
  toggleCartItemQuanitity: () => null,
  totalPrice: 0,
  totalQuantities: 0
};

const CartContext = createContext<CartContextData>(cartContextDefaultValues);

export type CartProviderProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [showCart, setShowCart] = useState<ShowCartType>('initial');
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  const onAddProductToCart = (product: Product, quantity: number) => {
    const isProductInCart = cartItems.find(
      (item: CartProductType) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (isProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      const currentProduct = { ...product, quantity: quantity };

      setCartItems([...cartItems, currentProduct]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemoveProductFromCart = (product: Product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);

    if (foundProduct) {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
      );
    }

    setCartItems((previousCartItems) =>
      previousCartItems.filter((item) => item._id !== product._id)
    );
  };

  const toggleCartItemQuanitity = (
    product: CartProductType,
    cartAction: string
  ) => {
    if (cartAction === ActionType.INCREASE_ITEM_QTY) {
      setCartItems((previousCartItems) =>
        previousCartItems.map((item) => {
          if (item._id === product._id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );

      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    }

    if (cartAction === ActionType.DECREASE_ITEM_QTY) {
      if (product.quantity > 1) {
        setCartItems((previousCartItems) =>
          previousCartItems.map((item) => {
            if (item._id === product._id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
        );

        setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 0;

      return prevQty - 1;
    });
  };

  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        onAddProductToCart,
        toggleCartItemQuanitity,
        onRemoveProductFromCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
