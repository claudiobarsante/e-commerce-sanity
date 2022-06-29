import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const SANITY_TOKEN = String(process.env.NEXT_PUBLIC_SANITY_TOKEN);
export const client = sanityClient({
	projectId: '1snjs8et',
	dataset: 'production',
	apiVersion: '2022-06-29',
	useCdn: true,
	token:
		'skXcSsASmWXW33XF7HrWuL1kTqKEaTZBhLtl8pPwxRv6aOgBi7nXgaTOnWo4gEuG3xcdXfVXnls62bBG4ozgVfjcFvD3dJe9fIyqAIKfrxM28QuDgI0jczor0qkJHFPpxZ5u7UjU9yg8AlLxK1oU0cJ0bXdVNgryGzS5WWqM7cpNP2Y324Jc',
});

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
