import React from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = () => {
	return (
		<>
			<HeroBanner />
			<div className='products-heading'>
				<h2>Best Selling products</h2>
			</div>
			<FooterBanner />
		</>
	);
};

export default Home;
