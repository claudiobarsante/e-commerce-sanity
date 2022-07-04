import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
// -- Components
import Layout from 'components/Layout';
// -- Context
import { CartProvider } from 'context/cart';
// -- styles
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
