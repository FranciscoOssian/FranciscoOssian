import BlogList from './Component';
import Fallback from './Fallback';

export default function Con({ listPosts }: { listPosts: Array<any> }) {
  return (
    <Fallback>
      <BlogList listPosts={listPosts} />
    </Fallback>
  );
}
