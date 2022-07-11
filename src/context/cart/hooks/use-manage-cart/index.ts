import { useState } from 'react';
import { toast } from 'react-hot-toast';
// --Types
import { ActionType, CartProductType } from 'context/cart/types';
// -- components
import { ProductInfo as Product } from 'components/Product';

export default function useManageCart() {
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);

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

    toast.success(`${quantity} ${product.name} added to the cart.`);
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

  return {
    onAddProductToCart,
    onRemoveProductFromCart,
    toggleCartItemQuanitity,
    cartItems,
    totalPrice,
    totalQuantities,
    setCartItems,
    setTotalPrice,
    setTotalQuantities
  };
}
