import getPinnedRepos from '@/services/github/getPinnedRepos';
import List from '@/components/common/RepoList';

export default async function PinnedRepos() {
  const repos: any = await getPinnedRepos();

  return <List repos={repos} />;
}
