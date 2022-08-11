import React from 'react';
import { ProductType } from 'components/Product/types';
import Product from '..';
import * as S from './styles';

export type Props = {
  productsData: ProductType[];
};

const ProductsContainer = ({ productsData }: Props) => {
  return (
    <>
      <S.ProductHeading>
        <h2>Best Selling products</h2>
        <p>speaker there are many variations passages</p>
      </S.ProductHeading>
      <S.Container>
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </S.Container>
    </>
  );
};

export default ProductsContainer;
