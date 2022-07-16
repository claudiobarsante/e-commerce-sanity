import React from 'react';
import Img from 'next/image';
import Link from 'next/link';
// -- Types
import { BannerInfo } from 'components/HeroBanner';
// -- Sanity client
import { urlFor } from 'lib/client';
import Button from 'components/Button';

type FooterBannerprops = {
  footerBanner: BannerInfo;
};
const index = ({ footerBanner }: FooterBannerprops) => {
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc
  } = footerBanner;
  console.log('product: ' + product);

  return (
    <div className="footer-banner-container">
      {/* <div className="banner-desc"> */}
      <div className="">
        <div className="left">
          <p>{discount}qqqqqqqqq</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <Button
              isUpperCase={false}
              hasRadius
              isFilled
              backgroundColor="white"
              size="small"
              aria-label={buttonText}
            >
              {buttonText}
            </Button>
            {/* <button type="button" className="" role="button">
              {buttonText}
            </button> */}
          </Link>
        </div>
        {/* <Img
          src={urlFor(image.asset).url()}
          alt={product}
          className="footer-banner-image"
          layout="fill"
          role="image"
        /> */}
      </div>
    </div>
  );
};

export default index;
