import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Navbar } from '@/components/Navbar';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import { StoreProvider } from '@/components/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Timez - Time Zone Converter',
  description:
    'Easily convert time between different timezones and compare overlapping time periods.',
  metadataBase: new URL('https://timez.eason.ch'),
  openGraph: {
    title: 'Timez - Time Zone Converter',
    description:
      'Easily convert time between different timezones and compare overlapping time periods.',
    url: 'https://timez.eason.ch',
    siteName: 'Timez',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://timez.eason.ch/og.png',
        width: 1041,
        height: 662,
        alt: 'Timez - Time Zone Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timez - Time Zone Converter',
    description:
      'Easily convert time between different timezones and compare overlapping time periods.',
    images: [
      {
        url: 'https://timez.eason.ch/og.png',
        width: 1041,
        height: 662,
        alt: 'Timez - Time Zone Converter',
      },
    ],
    creator: '@EasonChang_me',
    // site: '@easonchang',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <NextAuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="grow bg-muted/40">{children}</main>
              {/* <Footer /> */}
            </div>
          </NextAuthProvider>
        </StoreProvider>

        <Analytics />
      </body>
    </html>
  );
}
