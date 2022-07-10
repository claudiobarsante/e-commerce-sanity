import React from 'react';
import Img from 'next/image';
import Link from 'next/link';
// -- Sanity client
import { urlFor } from 'lib/client';

export type BannerInfo = {
  buttonText: string;
  desc: string;
  discount: string;
  image: { _type: string; asset: { _ref: string } };
  largeText1: string;
  largeText2: string;
  midText: string;
  product: string;
  saleTime: string;
  smallText: string;
};
export type HeroBannerProps = {
  heroBanner: BannerInfo;
};

const index = ({ heroBanner }: HeroBannerProps) => {
  const { smallText, midText, largeText1, image, product, buttonText, desc } =
    heroBanner;
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <Img
          src={urlFor(image).url()}
          alt={smallText}
          className="hero-banner-image"
        />
        <Link href={`/product/${product}`}>
          <button type="button" className="" role="button">
            {buttonText}
          </button>
        </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default index;
