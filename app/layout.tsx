import { prefix } from '@/utils/prefix';
import type { Metadata } from 'next';
import Script from 'next/script';
import ThemeInitializer from './_components/ThemeInitializer';
import { Viewport } from 'next';
import '@/styles/style.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  icons: {
    icon: [
      { url: `${prefix}/favicon.ico` },
      { url: `${prefix}/favicon-16x16.png`, type: 'image/png', sizes: '16x16' },
      {
        url: `${prefix}/favicon-32x32.png`,
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: [{ url: `${prefix}/favicon-512x512.png` }],
  },
  description: 'Easily add collaboration to your apps with our API-based services.',
  openGraph: {
    type: 'website',
    siteName: 'Yorkie',
    title: 'Yorkie - Bring collaboration to your app',
    images: [{ url: `/og.png` }],
    url: '',
    description: 'Easily add collaboration to your apps with our API-based services.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@team_yorkie',
    title: 'Yorkie - Bring collaboration to your app',
    images: [`/og.png`],
    description: 'Easily add collaboration to your apps with our API-based services.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-7KXWLDH8CH" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7KXWLDH8CH');
        `}
      </Script>
      <body>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
