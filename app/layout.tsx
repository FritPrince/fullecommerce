import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LuxeMarket - E-commerce Premium',
  description: 'Découvrez LuxeMarket, votre destination premium pour la mode et les accessoires de luxe. Collections exclusives, design élégant et expérience shopping exceptionnelle.',
  keywords: 'luxe, mode, e-commerce, premium, accessoires, vêtements, shopping',
  authors: [{ name: 'LuxeMarket Team' }],
  creator: 'LuxeMarket',
  publisher: 'LuxeMarket',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://luxemarket.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LuxeMarket - E-commerce Premium',
    description: 'Découvrez LuxeMarket, votre destination premium pour la mode et les accessoires de luxe.',
    url: 'https://luxemarket.com',
    siteName: 'LuxeMarket',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LuxeMarket - E-commerce Premium',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxeMarket - E-commerce Premium',
    description: 'Découvrez LuxeMarket, votre destination premium pour la mode et les accessoires de luxe.',
    images: ['/og-image.jpg'],
    creator: '@luxemarket',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#667eea" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-title" content="LuxeMarket" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="relative">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#374151',
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}