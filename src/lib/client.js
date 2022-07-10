import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const configuredSanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2022-06-29',
  useCdn: true
  //token: process.env.SANITY_AUTH_TOKEN
});

const builder = imageUrlBuilder(configuredSanityClient);

export const urlFor = (source) => builder.image(source);
