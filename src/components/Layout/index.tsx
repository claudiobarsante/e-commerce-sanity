import React from 'react';
import Head from 'next/head';
// -- Components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

type LayoutProps = {
  children: React.ReactNode;
};
const index = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>Phanox store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default index;
