import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import { Navbar } from '@/components/Navbar';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import { SegmentAnalytics } from '@/components/SegmentAnalytics';
import { StoreProvider } from '@/components/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coinz - Expense Tracker',
  description: 'Easily track your expenses and income in a single place.',
  metadataBase: new URL('https://coinz.eason.ch'),
  openGraph: {
    title: 'Coinz - Expense Tracker',
    description: 'Easily track your expenses and income in a single place.',
    url: 'https://coinz.eason.ch',
    siteName: 'Coinz',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://coinz.eason.ch/og.png',
        width: 1041,
        height: 662,
        alt: 'Coinz - Expense Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coinz - Expense Tracker',
    description: 'Easily track your expenses and income in a single place.',
    images: [
      {
        url: 'https://coinz.eason.ch/og.png',
        width: 1041,
        height: 662,
        alt: 'Coinz - Expense Tracker',
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
              <main className="grow bg-muted/40">
                <Suspense>{children}</Suspense>
              </main>
              {/* <Footer /> */}
            </div>
          </NextAuthProvider>
        </StoreProvider>

        <SegmentAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
