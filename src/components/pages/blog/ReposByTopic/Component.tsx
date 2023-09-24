import './pin.scss';
import getReposByTopic from '@/services/github/getReposByTopic';
import List from '@/components/common/RepoList';

export default async function RepoList({ topic }: { topic: string }) {
  const list: any = await getReposByTopic(topic);

  return <List goToGithub={false} repos={list} />;
}
