import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import NextNprogress from 'nextjs-progressbar';
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
        <NextNprogress
          color="#f02d34"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
