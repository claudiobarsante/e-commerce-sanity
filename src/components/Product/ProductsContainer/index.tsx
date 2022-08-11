import React from 'react';
import s
const ProductsContainer = () => {
  return <div className="products-heading">
  <h2>Best Selling products</h2>
  <p>speaker there are many variations passages</p>
</div>
<div className="products-container">
  {productsData?.map((product) => (
    <Product key={product._id} product={product} />
  ))}
</div>
};

export default ProductsContainer;
