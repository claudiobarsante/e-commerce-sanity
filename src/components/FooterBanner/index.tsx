import React from 'react';
import Link from 'next/link';
// -- Types
import { BannerInfo } from 'components/HeroBanner';
// -- Sanity client
import { urlFor } from 'lib/client';

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
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button" className="" role="button">
              {buttonText}
            </button>
          </Link>
        </div>
        <img
          src={urlFor(image.asset)}
          alt={product}
          className="footer-banner-image"
        />
      </div>
    </div>
  );
};

export default index;
