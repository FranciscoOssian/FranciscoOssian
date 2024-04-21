import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from '../components/common/Head';
import getSetting from '@/services/github/getSetting';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

async function getPageData(): Promise<any> {
  const c = await getSetting('foln-cms-md', 'pages/settings.yaml');
  console.log(c);
  return c;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getPageData())?.content;
  return {
    title: settings?.title ?? 'frferer',
    description: settings?.description,
    applicationName: settings?.applicationName,
    authors: settings?.authors,
    creator: 'Francisco Ossian',
    publisher: 'Francisco Ossian',
    openGraph: {
      type: settings?.OG?.type ?? 'website',
      url: settings?.OG?.url ?? 'https://www.foln.dev/about',
      title: settings?.OG?.title ?? 'Francisco Ossian',
      description: settings?.OG?.description ?? '',
      siteName: settings?.OG?.siteName ?? 'FOLN.dev',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Head />
        {children}
      </body>
    </html>
  );
}
