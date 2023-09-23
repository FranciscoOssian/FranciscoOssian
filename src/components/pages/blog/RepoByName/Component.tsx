import './pin.scss';
import getReposByName from '@/services/github/getRepoByName';
import List from '@/components/common/RepoList';

export default async function RepoList({ name }: { name: string }) {
  const repo: any = await getReposByName(name);

  console.log('this repo', repo);

  return <List repos={[repo]} />;
}
