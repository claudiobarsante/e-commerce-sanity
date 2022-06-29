import React from 'react';
import Link from 'next/link';
// -- Sanity client
import { urlFor } from 'lib/client';

export type ProductInfo = {
  _id: string;
  details: string;
  image: { _type: string; asset: { _ref: string } };
  name: string;
  price: number;
  slug: { _type: string; current: string };
};

export type ProductProps = {
  product: ProductInfo;
};

const index = ({ product }: ProductProps) => {
  const { image, name, slug, price } = product;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            alt={name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default index;
