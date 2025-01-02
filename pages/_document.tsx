import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Script id="initial-theme" strategy="beforeInteractive">
          {`
            (function () {
              const theme = window.localStorage.getItem('theme') || 'system';
              const isDarkMode = theme === 'dark' ||
                (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              if (isDarkMode) {
                window.document.documentElement.classList.add('darkmode');
                window.document.documentElement.style.colorScheme = 'dark';
              }
            })();
          `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
