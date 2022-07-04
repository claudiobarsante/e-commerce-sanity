import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
// -- Icons
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar
} from 'react-icons/ai';
// -- Sanity client
import { client, urlFor } from 'lib/client';
// -- Components,Types
import Product, { ProductInfo } from 'components/Product';
// -- Custom hooks
import { useCart } from 'context/cart';
type ProductDetailsProps = {
  product: ProductInfo;
  products: ProductInfo[];
};

export default function ProductDetails({
  product,
  products
}: ProductDetailsProps) {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  const {
    decreaseQty,
    increaseQty,
    qty,
    onAddProductToCart,
    onRemoveProductFromCart
  } = useCart();

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, currentIndex) => (
              <img
                key={currentIndex}
                src={urlFor(item)}
                className={
                  currentIndex === index
                    ? 'small-image selected-image'
                    : 'small-image'
                }
                onMouseEnter={() => setIndex(currentIndex)}
              />
            ))}
          </div>
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
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAddProductToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={() => onRemoveProductFromCart(product)}
            >
              Buy Now
            </button>
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

  const products: ProductInfo[] = await client.fetch(query);

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

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      product,
      products
    },
    revalidate: 10 // In seconds
  };
};
