import { renderHook, act } from '@testing-library/react-hooks';
import { ActionType } from 'context/cart/types';
import useManageCart from '.';
import { fakeProductOne, fakeProductTwo } from './mock';

describe('useManageCart', () => {
  it('should add product to cart, when cart is empty', () => {
    const { result } = renderHook(() => useManageCart());

    act(() => {
      result.current.onAddProductToCart(fakeProductOne, 1);
    });

    expect(result.current.totalPrice).toBe(10);
    expect(result.current.totalQuantities).toBe(1);
    const newCartItem = { ...fakeProductOne, quantity: 1 };
    expect(result.current.cartItems).toStrictEqual([newCartItem]);
  });

  it('should add product to cart, with quantity > 1', () => {
    const { result } = renderHook(() => useManageCart());

    act(() => {
      result.current.onAddProductToCart(fakeProductOne, 2);
    });

    expect(result.current.totalPrice).toBe(20);
    expect(result.current.totalQuantities).toBe(2);
    const newCartItem = { ...fakeProductOne, quantity: 2 };
    expect(result.current.cartItems).toStrictEqual([newCartItem]);
  });

  it('should add product to cart, when cart already contains product', () => {
    const { result } = renderHook(() => useManageCart());
    //*First product
    act(() => {
      result.current.onAddProductToCart(fakeProductOne, 1);
    });
    //*Add again the same product
    act(() => {
      result.current.onAddProductToCart(fakeProductOne, 1);
    });

    expect(result.current.totalPrice).toBe(20);
    expect(result.current.totalQuantities).toBe(2);
    const newCartItem = { ...fakeProductOne, quantity: 2 };
    expect(result.current.cartItems).toStrictEqual([newCartItem]);
  });

  it('should add a different product to cart', () => {
    const { result } = renderHook(() => useManageCart());
    //*First product
    act(() => {
      result.current.onAddProductToCart(fakeProductOne, 1);
    });
    //*Add a different product
    act(() => {
      result.current.onAddProductToCart(fakeProductTwo, 1);
    });

    expect(result.current.totalPrice).toBe(30);
    expect(result.current.totalQuantities).toBe(2);
    const newCartItemOne = { ...fakeProductOne, quantity: 1 };
    const newCartItemTwo = { ...fakeProductTwo, quantity: 1 };
    expect(result.current.cartItems).toStrictEqual([
      newCartItemOne,
      newCartItemTwo
    ]);
  });

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useManageCart());

    act(() => {
      result.current.onRemoveProductFromCart(fakeProductOne);
    });

    expect(result.current.totalPrice).toBe(0);
    expect(result.current.totalQuantities).toBe(0);
    expect(result.current.cartItems).toEqual([]);
  });

  describe('updating cart - increase and decreasing product qty, when product already in the cart', () => {
    it('should INCREASE_PRODUCT_QTY', () => {
      const { result } = renderHook(() => useManageCart());

      act(() => {
        result.current.onAddProductToCart(fakeProductOne, 1);
      });

      //*Increase the product qty in cart
      const newCartItemOne = { ...fakeProductOne, quantity: 1 };
      act(() => {
        result.current.updateCart(newCartItemOne, 'increase');
      });

      expect(result.current.totalPrice).toBe(20);
      expect(result.current.totalQuantities).toBe(2);
      const increasedCartItem = { ...newCartItemOne, quantity: 2 };
      expect(result.current.cartItems).toStrictEqual([increasedCartItem]);
    });

    it('should not DECREASE_PRODUCT_QTY if only exits one product item', () => {
      const { result } = renderHook(() => useManageCart());

      act(() => {
        result.current.onAddProductToCart(fakeProductOne, 1);
      });

      //*Decrease the product qty in cart
      const newCartItemOne = { ...fakeProductOne, quantity: 1 };
      act(() => {
        result.current.updateCart(newCartItemOne, 'decrease');
      });

      expect(result.current.totalPrice).toBe(10);
      expect(result.current.totalQuantities).toBe(1);
      const decreasedCartItem = { ...newCartItemOne, quantity: 1 };
      expect(result.current.cartItems).toStrictEqual([decreasedCartItem]);
    });

    it('should DECREASE_PRODUCT_QTY', () => {
      const { result } = renderHook(() => useManageCart());

      act(() => {
        result.current.onAddProductToCart(fakeProductOne, 2);
      });

      //*Decrease the product qty in cart
      const newCartItemOne = { ...fakeProductOne, quantity: 2 }; // current qty
      act(() => {
        result.current.updateCart(newCartItemOne, 'decrease');
      });

      expect(result.current.totalPrice).toBe(10);
      expect(result.current.totalQuantities).toBe(1);
      const decreasedCartItem = { ...fakeProductOne, quantity: 1 };
      expect(result.current.cartItems).toStrictEqual([decreasedCartItem]);
    });
  });
});
