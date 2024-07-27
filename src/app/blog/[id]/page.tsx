import AboveMin from '@/components/common/AboveMin';
import MdToHTML from '@/components/common/MdToHtml';
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
  if (!yaml)
    return {
      title: 'Francisco Ossian - Blog',
      authors: [{ name: 'Francisco Ossian', url: 'https://foln.dev' }],
      openGraph: {
        url: `https://www.foln.dev/blog/`,
      },
    };

  const settings = await yamlToJSON(yaml[0].object.text);

  return {
    title: settings?.title,
    description: settings?.description,
    authors: settings?.authors ?? [{ name: 'Francisco Ossian', url: 'https://foln.dev' }],
    openGraph: {
      url: settings?.OG?.url ?? `https://www.foln.dev/blog/${params.id}`,
      title: settings?.OG?.title,
      description: settings?.OG?.description,
    },
  };
}

export default async function Post({ params }: { params: { id: string } }) {
  const { yaml, markdonw, lastCommit } = await getPage('foln-cms-md', `pages/blog/${params.id}`);
  const settings = await yamlToJSON(yaml[0].object.text);
  return (
    <>
      <AboveMin title={settings?.title} />
      <PageFrame>
        <div className="text-white">
          last edit: {`${lastCommit.target.history.edges[0].node.committedDate}`}
        </div>
        <MdToHTML text={markdonw[0].object.text} />
      </PageFrame>
    </>
  );
}
