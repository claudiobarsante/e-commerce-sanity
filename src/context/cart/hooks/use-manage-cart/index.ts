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

  const updateProductQty = (
    cartItems: CartProductType[],
    action: ActionType,
    quantity: number,
    product: Product
  ) => {
    const updatedCartItems = cartItems.map((cartProduct) => {
      const actions = {
        [ActionType.INCREASE_PRODUCT_QTY]: function (
          currentQty: number,
          qty: number
        ) {
          return currentQty + qty;
        },
        [ActionType.DECREASE_PRODUCT_QTY]: function (
          currentQty: number,
          qty: number
        ) {
          return currentQty - qty;
        }
      };
      if (cartProduct._id === product._id) {
        return {
          ...cartProduct,
          quantity: actions[action](cartProduct.quantity, quantity)
        };
      }
      return cartProduct;
    });

    setCartItems(updatedCartItems);
  };

  const onAddProductToCart = (product: Product, quantity: number) => {
    const isProductInCart = cartItems.find(
      (item: CartProductType) => item._id === product._id
    );
    if (isProductInCart) {
      updateProductQty(
        cartItems,
        ActionType.INCREASE_PRODUCT_QTY,
        quantity,
        product
      );
    } else {
      const currentProduct = { ...product, quantity: quantity };

      setCartItems([...cartItems, currentProduct]);
    }

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

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

      setCartItems((previousCartItems) =>
        previousCartItems.filter((item) => item._id !== product._id)
      );
    }
  };

  const updateCart = (product: CartProductType, cartAction: string) => {
    if (cartAction === ActionType.INCREASE_PRODUCT_QTY) {
      updateProductQty(cartItems, ActionType.INCREASE_PRODUCT_QTY, 1, product);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    }

    if (cartAction === ActionType.DECREASE_PRODUCT_QTY) {
      if (product.quantity > 1) {
        updateProductQty(
          cartItems,
          ActionType.DECREASE_PRODUCT_QTY,
          1,
          product
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return {
    onAddProductToCart,
    onRemoveProductFromCart,
    updateCart,
    cartItems,
    totalPrice,
    totalQuantities,
    setCartItems,
    setTotalPrice,
    setTotalQuantities
  };
}
