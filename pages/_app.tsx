import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/style.css';
import { prefix } from '@/utils/prefix';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href={`${prefix}/favicon.ico`} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
