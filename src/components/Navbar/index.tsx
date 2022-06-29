import React from 'react';
import Link from 'next/link';
// -- Icons
import { AiOutlineShopping } from 'react-icons/ai';

const index = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Phanox Headphones Store</Link>
      </p>
      <button type="button" className="cart-icon" onClick={() => {}}>
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default index;
