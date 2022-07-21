import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import NextNprogress from 'nextjs-progressbar';
import { ThemeProvider } from 'styled-components';
// -- Components
import Layout from 'components/Layout';
// -- Context
import { CartProvider } from 'context/cart';
// -- styles
import '../styles/globals.css';
import GlobalStyles from 'styles/global';
import { themeApp } from 'styles/theme';
// -- Error
import ErrorBoundary from 'components/ErrorBoundary/index';
import ErrorFallback from 'components/ErrorFallback';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ThemeProvider theme={themeApp}>
        <GlobalStyles />
        <Layout>
          <Toaster />
          <NextNprogress
            color="#f02d34"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ThemeProvider>
    </CartProvider>
  );
}

export default MyApp;
