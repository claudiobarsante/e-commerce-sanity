import React from 'react';
import Img from 'next/image';
import Link from 'next/link';
// -- Types
import { BannerInfo } from 'components/HeroBanner';
// -- Sanity client
import { urlFor } from 'lib/client';
import Button from 'components/Button';
import * as S from './styles';

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
    <S.Container>
      <S.Left>
        <p>{discount}</p>
        <h3>{largeText1}</h3>
        <h3>{largeText2}</h3>
        <p>{saleTime}</p>
      </S.Left>
      <S.ImageContainer>
        <Img
          src={urlFor(image.asset).url()}
          alt={product}
          layout="fill"
          role="image"
          aria-label={product}
        />
      </S.ImageContainer>
      <S.Right>
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
        </Link>
      </S.Right>
    </S.Container>
  );
};

export default index;
