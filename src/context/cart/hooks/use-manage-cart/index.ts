import { useState } from 'react';
import { toast } from 'react-hot-toast';
// --Types
import { ActionType, CartProductType } from 'context/cart/types';
// -- components
import { ProductType as ProductType } from 'components/Product/types';

export default function useManageCart() {
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);

  const updateProductQty = (
    cartItems: CartProductType[],
    action: ActionType,
    quantity: number,
    product: ProductType
  ) => {
    const actions = {
      increase: function (currentQty: number, qty: number) {
        return currentQty + qty;
      },
      decrease: function (currentQty: number, qty: number) {
        return currentQty - qty;
      }
    };
    const updatedCartItems = cartItems.map((cartProduct) => {
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

  const onAddProductToCart = (product: ProductType, quantity: number) => {
    const isProductInCart = cartItems.find(
      (item: CartProductType) => item._id === product._id
    );
    if (isProductInCart) {
      updateProductQty(cartItems, 'increase', quantity, product);
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

  const onRemoveProductFromCart = (product: ProductType) => {
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

  const updateCart = (product: CartProductType, cartAction: ActionType) => {
    if (cartAction === 'increase') {
      updateProductQty(cartItems, cartAction, 1, product);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    }

    if (cartAction === 'decrease') {
      if (product.quantity > 1) {
        updateProductQty(cartItems, cartAction, 1, product);
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
