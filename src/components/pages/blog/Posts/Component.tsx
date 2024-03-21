import './pin.scss';
import List from '@/components/common/RepoList';

export default async function PostList({ listPosts }: { listPosts: Array<any> }) {
  return <List repos={listPosts} />;
}
