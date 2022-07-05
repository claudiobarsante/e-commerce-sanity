import React from 'react';
import { GetServerSideProps } from 'next';
// -- Sanity client
import { client } from 'lib/client';
// -- Components
import { Product, FooterBanner, HeroBanner } from 'components';
// -- Types
import { BannerInfo } from 'components/HeroBanner';
import { ProductInfo } from 'components/Product';

type Props = {
  productsData: ProductInfo[];
  bannerData: BannerInfo[];
};

const Home = ({ productsData, bannerData }: Props) => {
  return (
    <>
      {bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}

      <div className="products-heading">
        <h2>Best Selling products</h2>
        <p>speaker there are many variations passages</p>
      </div>
      <div className="products-container">
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {bannerData && <FooterBanner footerBanner={bannerData[0]} />}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      productsData,
      bannerData
    }
  };
};
