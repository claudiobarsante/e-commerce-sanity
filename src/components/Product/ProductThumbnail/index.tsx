import React, { Dispatch, SetStateAction } from 'react';
import Img from 'next/image';
// -- Sanity image builder
import { urlFor } from 'lib/client';
// -- Custom components
import { ProductInfo } from '..';

type ProductThumbnailProps = {
  index: number;
  onSetIndex: Dispatch<SetStateAction<number>>;
} & Pick<ProductInfo, 'image' | 'name'>;

const ProductThumbnail = ({
  image,
  index,
  name,
  onSetIndex
}: ProductThumbnailProps) => {
  return (
    <div className="small-images-container">
      {image?.map((item, currentIndex) => (
        <Img
          key={currentIndex}
          src={urlFor(item).url()}
          className={
            currentIndex === index
              ? 'small-image selected-image'
              : 'small-image'
          }
          height={70}
          width={70}
          onMouseEnter={() => onSetIndex(currentIndex)}
          alt={name}
        />
      ))}
    </div>
  );
};

export default ProductThumbnail;
