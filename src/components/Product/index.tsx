import React from 'react';
import Img from 'next/image';
import Link from 'next/link';
// -- Sanity image builder
import { urlFor } from 'lib/client';
// - Types
import { ProductProps } from './types';
// -- Styles
import * as S from './styles';
// -- Utils
import formatValue from 'lib/formatValue';

const Product = ({ product }: ProductProps) => {
  const { image, name, slug, price } = product;
  return (
    <Link href={`/product/${slug.current}`}>
      <S.ProductCard role="img">
        {image && (
          <Img
            src={urlFor(image[0]).url()}
            alt={name}
            width={250}
            height={250}
            aria-label={name}
          />
        )}

        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{formatValue(price)}</S.ProductPrice>
      </S.ProductCard>
    </Link>
  );
};

export default Product;
