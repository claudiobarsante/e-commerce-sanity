export type ImageContent = {
  _key: string;
  _type: string;
  asset: { _ref: string };
};
export type ProductInfo = {
  _id: string;
  details: string;
  image: ImageContent[];
  name: string;
  price: number;
  slug: { _type: string; current: string };
};

export type ProductProps = {
  product: ProductInfo;
};
