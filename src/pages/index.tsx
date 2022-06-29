import React from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';
import { client } from 'lib/client';
import { GetServerSideProps } from 'next';
import { BannerInformation, HeroBannerProps } from 'components/HeroBanner';

type Products = {
	details: string;
	image: any;
	name: string;
	price: number;
	slug: { _type: string; current: string };
};

type Props = {
	productsData: Products[];
	bannerData: BannerInformation[];
};

const Home = ({ productsData, bannerData }: Props) => {
	return (
		<>
			{bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}

			<div className='products-heading'>
				<h2>Best Selling products</h2>
				<p>speaker there are many variations passages</p>
			</div>
			<div className='products-container'>{productsData?.map(product => product.name)}</div>
			<FooterBanner />
		</>
	);
};

export default Home;
export const getServerSideProps: GetServerSideProps = async () => {
	const productsQuery = '*[_type == "product"]';
	const productsData = await client.fetch(productsQuery);
	// console.log(
	// 	'🚀 ~ file: index.tsx ~ line 24 ~ constgetServerSideProps:GetServerSideProps= ~ productsData',
	// 	productsData
	// );

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);
	// console.log(
	// 	'🚀 ~ file: index.tsx ~ line 29 ~ constgetServerSideProps:GetServerSideProps= ~ bannerData',
	// 	bannerData
	// );

	return {
		props: {
			productsData,
			bannerData,
		},
	};
};
