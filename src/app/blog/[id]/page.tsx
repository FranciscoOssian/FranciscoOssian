import getRepoByName from '@/services/github/getRepoByName'

import MdToHTML from '@/components/common/MdToHtml';
import PageContainer from '@/components/common/PageContainer';

import RepoByName from '@/components/pages/blog/RepoByName'

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

export default async function Post({ params }: { params: { id: string } }) {
  const repo: any = await getRepoByName(params.id);
  return <PageContainer>
    <RepoByName name={params.id}/>
    <>
      last edit: {formatarData(`${repo.ref.target.history.edges[0].node.committedDate}`)}
    </>
    <MdToHTML text={repo.object.text}/>
  </PageContainer>
}