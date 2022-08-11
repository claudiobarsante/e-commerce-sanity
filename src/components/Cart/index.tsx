import React, { useCallback, useRef, memo } from 'react';
import Img from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
// -- Icons
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
// -- Context
import { useCart } from 'context/cart';
// -- Sanity image builder
import { urlFor } from 'lib/client';
// -- Types
import { ActionType, CartStatus } from 'context/cart/types';
import { getStripe } from 'lib/stripe-js';

export type CartProps = {
  isVisible: CartStatus;
};

const CartComponent = () => {
  const cartRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const {
    showCart,
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    updateCart,
    onRemoveProductFromCart
  } = useCart();

  const handleCheckout = useCallback(async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    });

    if (response.status === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe!.redirectToCheckout({ sessionId: data.id });
  }, [cartItems]);

  const displayClass = {
    initial: 'cart-wrapper-initial',
    show: 'cart-wrapper cart-wrapper-show',
    hidden: 'cart-wrapper cart-wrapper-hide'
  };

  return (
    <div className={displayClass[showCart]} ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart('hidden')}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart('hidden')}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((product) => (
              <div className="product" key={product._id}>
                <div className="cart-product-image">
                  <Img
                    src={urlFor(product?.image[0]).url()}
                    layout="responsive"
                    height={450}
                    width={450}
                    role="img"
                  />
                </div>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{product.name}</h5>
                    <h4>${product.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => updateCart(product, 'decrease')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{product.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => updateCart(product, 'increase')}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemoveProductFromCart(product)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={() => handleCheckout()}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Cart = memo(CartComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
