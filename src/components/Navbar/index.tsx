import React from 'react';
import Link from 'next/link';
// -- Icons
import { AiOutlineShopping } from 'react-icons/ai';
// -- components
import Cart from 'components/Cart';
// -- Context
import { CartStatus, useCart } from 'context/cart';

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useCart();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Phanox Headphones Store</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(CartStatus.SHOW)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      <Cart isVisible={showCart} />
    </div>
  );
};

export default NavBar;
