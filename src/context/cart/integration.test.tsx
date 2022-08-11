import { renderHook, act } from '@testing-library/react-hooks';
import { useCart, CartProvider } from 'context/cart';
import { CartProviderProps } from './types';
import { ActionType, CartStatus, ShowCartType } from 'context/cart/types';
import { fakeProductOne, fakeProductTwo } from './hooks/use-manage-cart/mock';

describe('CartProvider', () => {
  it('sould set the cart to show or not', async () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), {
      wrapper
    });

    //* Set cart status to 'initial'
    act(() => {
      result.current.setShowCart('initial');
    });
    expect(result.current.showCart).toBe('initial');
    //*Set cart status to 'show'
    act(() => {
      result.current.setShowCart('show');
    });
    expect(result.current.showCart).toBe('show');
    //*Set cart status to 'hidden'
    act(() => {
      result.current.setShowCart('hidden');
    });
    expect(result.current.showCart).toBe('hidden');
  });

  it('should increase or decrease product qty', async () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), {
      wrapper
    });
    //* Increase product qty
    act(() => {
      result.current.increaseQty();
    });
    expect(result.current.qty).toBe(2);
    //* Decrease product qty
    act(() => {
      result.current.decreaseQty();
    });
    expect(result.current.qty).toBe(1);
    //* Decrease one more product qty. The minimum is one product qty
    act(() => {
      result.current.decreaseQty();
    });
    expect(result.current.qty).toBe(1);
  });

  describe('updating cart - increase and decreasing product qty, when product already in the cart', () => {
    it('should INCREASE_PRODUCT_QTY', () => {
      const wrapper = ({ children }: CartProviderProps) => (
        <CartProvider>{children}</CartProvider>
      );

      const { result } = renderHook(() => useCart(), {
        wrapper
      });
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
      const wrapper = ({ children }: CartProviderProps) => (
        <CartProvider>{children}</CartProvider>
      );

      const { result } = renderHook(() => useCart(), {
        wrapper
      });

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
      const wrapper = ({ children }: CartProviderProps) => (
        <CartProvider>{children}</CartProvider>
      );

      const { result } = renderHook(() => useCart(), {
        wrapper
      });

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
