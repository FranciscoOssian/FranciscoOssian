import MdToHTML from '@/components/common/MdToHtml';
import PageFrame from '@/components/common/PageFrame';
import getPage from '@/services/github/getPage';
import yamlToJSON from '@/services/yaml';
import { Metadata } from 'next';

function formatarData(dataISO: string) {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  const segundos = String(data.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

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
  const { markdonw, lastCommit } = await getPage('foln-cms-md', `pages/blog/${params.id}`);
  return (
    <PageFrame className="text-white">
      <div>
        last edit: {formatarData(`${lastCommit.target.history.edges[0].node.committedDate}`)}
      </div>
      <MdToHTML text={markdonw[0].object.text} />
    </PageFrame>
  );
}
