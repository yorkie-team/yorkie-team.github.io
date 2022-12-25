import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import '@/styles/style.css';
import { prefix } from '@/utils/prefix';
import { ThemeOption, useTheme } from '@/hooks/useTheme';

function MyApp({ Component, pageProps }: AppProps) {
  const { setTheme } = useTheme();
  useEffect(() => {
    const themeOption = (window.localStorage.getItem('theme') || 'light') as ThemeOption;
    setTheme(themeOption);
  }, [setTheme]);

  return (
    <>
      <Head>
        <link rel="icon" href={`${prefix}/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${prefix}/favicon-16x16.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${prefix}/favicon-32x32.png`} />
        <link rel="apple-touch-icon" href={`${prefix}/favicon-512x512.png`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="Easily add collaboration to your apps with our API-based services." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Yorkie" />
        <meta property="og:title" content="Yorkie - Bring collaboration to your app" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og.png`} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta property="og:description" content="Easily add collaboration to your apps with our API-based services." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@team_yorkie" />
        <meta property="twitter:title" content="Yorkie - Bring collaboration to your app" />
        <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og.png`} />
        <meta
          property="twitter:description"
          content="Easily add collaboration to your apps with our API-based services."
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7KXWLDH8CH"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7KXWLDH8CH');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
