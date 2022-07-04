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

type CartItemType = {
  quantity: number;
} & Product;

export type CartContextData = {
  cartItems: CartItemType[];
  decQty: () => void;
  incQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  onRemove: (product: Product) => void;
  qty: number;
  setCartItems: Dispatch<SetStateAction<CartItemType[]>>;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  setTotalPrice: (price: number) => void;
  setTotalQuantities: (qty: number) => void;
  showCart: boolean;
  toggleCartItemQuanitity: (id: string, value: number) => void;
  totalPrice: number;
  totalQuantities: number;
};

const cartContextDefaultValues = {
  cartItems: [],
  decQty: () => null,
  incQty: () => null,
  onAdd: () => null,
  onRemove: () => null,
  qty: 0,
  setCartItems: () => null,
  setShowCart: () => null,
  setTotalPrice: () => null,
  setTotalQuantities: () => null,
  showCart: false,
  toggleCartItemQuanitity: () => null,
  totalPrice: 0,
  totalQuantities: 0
};

const CartContext = createContext<CartContextData>(cartContextDefaultValues);

export type CartProviderProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>(
    [] as CartItemType[]
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: CartItemType | undefined;
  let index;

  const onAdd = (product: CartItemType, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item: CartItemType) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems: CartItemType[] = cartItems.map(
        (cartProduct: CartItemType) => {
          if (cartProduct._id === product._id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            };
        }
      );

      if (updatedCartItems) setCartItems(updatedCartItems!);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product: CartItemType) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    if (foundProduct) {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
      );
    }

    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id: string, value: string) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 }
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 }
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

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
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
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
