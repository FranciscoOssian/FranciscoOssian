import './pin.scss';
import getReposByName from '@/services/github/getRepoByName';
import List from '@/components/common/RepoList';

export default async function RepoList({ name }: { name: string }) {
  const repo: any = await getReposByName(name);

  return <List repos={[repo]} />;
}
