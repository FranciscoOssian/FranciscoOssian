import getRepoByName from '@/services/github/getRepoByName'

import MdToHTML from '@/components/common/MdToHtml';
import PageContainer from '@/components/common/PageContainer';

import RepoByName from '@/components/pages/blog/RepoByName'

export default async function Post({ params }: { params: { id: string } }) {
  const repo: any = await getRepoByName(params.id);
  return <PageContainer>
    <RepoByName name={params.id}/>
    <MdToHTML text={repo.object.text}/>
  </PageContainer>
}