import React from 'react';
import { Metadata } from 'next';
import { inter, space_grotesk, montserrat_subrayada } from './fonts';
import getSetting from '@/services/github/getSetting';

import './globals.css';
import Footer from '@/components/common/Footer';

async function getPageData(): Promise<any> {
  const c = await getSetting('foln-cms-md', 'pages/settings.yaml');
  return c;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getPageData())?.content;
  return {
    title: settings?.title ?? 'francisco ossian',
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
      <body
        className={`${inter.className} ${space_grotesk.variable} ${montserrat_subrayada.variable}`}>
        {children}
        <Footer
          card={{
            image: '/me-draw.png',
            title: 'Francisco Ossian',
            text: 'Desenvolvendo ideias e criando soluções ',
          }}
          browse={['Blog', 'Work', 'Home']}
          services={[
            'Desenvolvimento Front-end',
            'Desenvolvimento Mobile',
            'Automação de Processos',
            'Desenvolvimento de APIs',
            'Consultoria e Auditoria de Código',
            'Desenvolvimento de Ferramentas e Utilitários',
            'Criação de Blogs e Conteúdo Técnico',
          ]}
          contact={[
            { src: '/github-icon.svg', href: 'https://github.com/FranciscoOssian' },
            { src: '/linkedin-icon.svg', href: 'https://www.linkedin.com/in/francisco-ossian/' },
            { src: '/email-icon.svg', href: 'mailto:francisco.ossian.ln@gmail.com' },
            {
              src: '/wpp-icon.svg',
              href: 'https://api.whatsapp.com/send/?phone=5555859920485&text&type=phone_number&app_absent=0',
            },
          ]}
        />
      </body>
    </html>
  );
}
