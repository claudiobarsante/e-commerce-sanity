import React from 'react';
import Img from 'next/image';
// -- Sanity image builder
import { urlFor } from 'lib/client';
// -- Custom components
import { ProductInfo } from '..';

type ProductDetailProps = { index: number } & Pick<
  ProductInfo,
  'image' | 'name'
>;

const ProductDetail = ({ image, index, name }: ProductDetailProps) => {
  return (
    <div className="image-container">
      {image && (
        <Img
          src={urlFor(image[index]).url()}
          layout="responsive"
          alt={name}
          priority
          width={400}
          height={400}
          className="product-detail-image"
        />
      )}
    </div>
  );
};
export default ProductDetail;
