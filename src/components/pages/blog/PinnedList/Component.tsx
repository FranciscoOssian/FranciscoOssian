import './pin.scss';
import getReposByTopic from '@/services/github/getReposByTopic';

export default async function RepoList() {
  const list: any = await getReposByTopic('portifolio');

  return <div>{JSON.stringify(list)}</div>;
}
