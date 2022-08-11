import React from 'react';
import { GetServerSideProps } from 'next';
// -- Sanity client
import { configuredSanityClient } from 'lib/client';
// -- Components
import { Product, FooterBanner, HeroBanner } from 'components';
// -- Types
import { BannerInfo } from 'components/HeroBanner';
import { ProductType } from 'components/Product/types';
import ProductsContainer from 'components/Product/ProductsContainer';

export type Props = {
  productsData: ProductType[];
  bannerData: BannerInfo[];
};

const Home = ({ productsData, bannerData }: Props) => {
  return (
    <>
      {bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}
      <ProductsContainer productsData={productsData} />
      {bannerData && <FooterBanner footerBanner={bannerData[0]} />}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const productsData = await configuredSanityClient.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await configuredSanityClient.fetch(bannerQuery);

  return {
    props: {
      productsData,
      bannerData
    }
  };
};
