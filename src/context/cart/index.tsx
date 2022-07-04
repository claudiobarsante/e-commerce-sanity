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

export type CartProductType = {
  quantity: number;
} & Product;

export type CartContextData = {
  cartItems: CartProductType[];
  decreaseQty: () => void;
  increaseQty: () => void;
  onAddProductToCart: (product: Product, quantity: number) => void;
  onRemoveProductFromCart: (product: Product) => void;
  qty: number;
  setCartItems: Dispatch<SetStateAction<CartProductType[]>>;
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
  decreaseQty: () => null,
  increaseQty: () => null,
  onAddProductToCart: () => null,
  onRemoveProductFromCart: () => null,
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
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartProductType[]>(
    [] as CartProductType[]
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  let foundProduct: CartProductType | undefined;
  let index;

  const onAddProductToCart = (product: Product, quantity: number) => {
    const isProductInCart = cartItems.find(
      (item: CartProductType) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (isProductInCart) {
      const updatedCartItems: CartProductType[] = cartItems.map(
        (cartProduct: CartProductType) => {
          if (cartProduct._id === product._id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            };
        }
      );

      if (updatedCartItems) setCartItems(updatedCartItems);
    } else {
      const currentProduct = { ...product, quantity: quantity };

      setCartItems([...cartItems, currentProduct]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemoveProductFromCart = (product: Product) => {
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
