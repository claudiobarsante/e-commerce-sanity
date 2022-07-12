import { renderHook, act } from '@testing-library/react-hooks';
import useManageCart from '.';

const fakeProductOne = {
  _id: '19e76cf4-6db1-4d41-9e4b-eaad3e393c74',
  details: 'Great looking and sounding headphones!',
  name: 'headphone',
  image: [],
  price: 10,
  slug: { _type: 'slug', current: 'headphones' }
};

const fakeProductTwo = {
  _id: '1x566cf4-6db1-4d41-9e4b-eaad3e393c74',
  details: 'Great speaker',
  name: 'speaker',
  image: [],
  price: 20,
  slug: { _type: 'slug', current: 'speaker' }
};

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
});
