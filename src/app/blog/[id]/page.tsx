//import MdToHTML from '@/components/common/MdToHtml';
import PageFrame from '@/components/common/PageFrame';
import getPage from '@/services/github/getPage';
import yamlToJSON from '@/services/yaml';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { yaml } = await getPage('foln-cms-md', `pages/blog/${params.id}`);
  const settings = await yamlToJSON(yaml[0].object.text);

  return {
    title: settings?.title,
    description: settings?.description,
    authors: settings?.authors ?? 'Francisco Ossian',
    openGraph: {
      url: settings?.OG?.url ?? `https://www.foln.dev/blog/${params.id}`,
      title: settings?.OG?.title,
      description: settings?.OG?.description,
    },
  };
}

export default async function Post({ params }: { params: { id: string } }) {
  return <PageFrame>çlmkl</PageFrame>;
}
