import React from 'react';
import { Metadata } from 'next';
import getSetting from '@/services/github/getSetting';

async function getPageData(): Promise<{ content: any; lastCommit: any }> {
  return await getSetting('foln-cms-md', 'pages/about/settings.yaml');
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getPageData())?.content;
  return {
    title: settings?.title ?? 'about',
    description: settings?.description,
    openGraph: {
      url: 'https://www.foln.dev/about',
      title: settings?.OG?.title ?? 'Francisco Ossian - about',
      description: settings?.OG?.description ?? '',
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
