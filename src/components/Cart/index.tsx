import React, { useCallback, useRef } from 'react';
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
import { ActionType, CartStatus, ShowCartType } from 'context/cart/types';
import { getStripe } from 'lib/stripe-js';

type CartProps = {
  isVisible: ShowCartType;
};

const Cart = ({ isVisible }: CartProps) => {
  const cartRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
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
    [CartStatus.INITIAL]: 'cart-wrapper-initial',
    [CartStatus.SHOW]: 'cart-wrapper cart-wrapper-show',
    [CartStatus.HIDDEN]: 'cart-wrapper cart-wrapper-hide'
  };

  return (
    <div className={displayClass[isVisible]} ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(CartStatus.HIDDEN)}
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
                onClick={() => setShowCart(CartStatus.HIDDEN)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <div className="cart-product-image">
                  <Img
                    src={urlFor(item?.image[0]).url()}
                    layout="responsive"
                    height={450}
                    width={450}
                  />
                </div>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(
                              item,
                              ActionType.DECREASE_ITEM_QTY
                            )
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(
                              item,
                              ActionType.INCREASE_ITEM_QTY
                            )
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemoveProductFromCart(item)}
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

export default Cart;
