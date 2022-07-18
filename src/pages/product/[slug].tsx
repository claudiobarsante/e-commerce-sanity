import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Img from 'next/image';

// -- Icons
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar
} from 'react-icons/ai';
// -- Sanity client
import { configuredSanityClient, urlFor } from 'lib/client';
// -- Components,Types
import Product, { ProductInfo } from 'components/Product';
// -- Custom hooks
import { useCart } from 'context/cart';
// -- Types
import { CartStatus } from 'context/cart/types';
import ProductDetail from 'components/Product/ProductDetail';
import ProductThumbnail from 'components/Product/ProductThumbnail';
import Button from 'components/Button';

type ProductDetailsProps = {
  product: ProductInfo;
  products: ProductInfo[];
};

export default function ProductDetails({
  product,
  products
}: ProductDetailsProps) {
  const [index, setIndex] = useState(0);

  const { image, name, details, price } = product;

  const { decreaseQty, increaseQty, qty, onAddProductToCart, setShowCart } =
    useCart();

  const handleBuyNow = () => {
    onAddProductToCart(product, qty);
    setShowCart(CartStatus.SHOW);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <ProductDetail image={image} name={name} index={index} />
          <ProductThumbnail
            image={image}
            name={name}
            index={index}
            onSetIndex={setIndex}
          />
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div>
            <Button
              isUpperCase={false}
              hasRadius={false}
              isFilled={false}
              size="medium"
              onClick={() => onAddProductToCart(product, qty)}
            >
              Add to Cart
            </Button>
            <Button
              isUpperCase={false}
              hasRadius={false}
              isFilled={true}
              backgroundColor="red"
              size="medium"
              onClick={() => handleBuyNow()}
            >
              Buy now
            </Button>
            {/* <button
              type="button"
              className="add-to-cart"
              onClick={() => onAddProductToCart(product, qty)}
            >
              Add to Cart
            </button> */}
            {/* <button
              type="button"
              className="buy-now"
              onClick={() => handleBuyNow}
            >
              Buy Now
            </button> */}
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -- should use getStaticProps and getStaticPaths when thedata comes
// -- from a headless CMS
export const getStaticPaths: GetStaticPaths = async () => {
  //? quering all products and geting only the current property from slug
  const query = `*[_type == "product"] {
          slug {
            current
          }
        }
        `;

  const products: ProductInfo[] = await configuredSanityClient.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
  const query = `*[_type == "product" && slug.current == '${params?.slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await configuredSanityClient.fetch(query);
  const products = await configuredSanityClient.fetch(productsQuery);

  return {
    props: {
      product,
      products
    },
    revalidate: 10 // In seconds
  };
};
