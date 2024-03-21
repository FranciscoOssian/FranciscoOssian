import React from 'react';
import { Metadata } from 'next';
import getSetting from '@/services/github/getSetting';

async function getPageData(): Promise<{ content: any; lastCommit: any }> {
  return await getSetting('foln-cms-md', 'pages/projects/settings.yaml');
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getPageData())?.content;
  return {
    title: settings?.title ?? 'projects',
    description: settings?.description,
    openGraph: {
      url: 'https://www.foln.dev/projects',
      title: settings?.OG?.title ?? 'Francisco Ossian - projects',
      description: settings?.OG?.description ?? '',
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
