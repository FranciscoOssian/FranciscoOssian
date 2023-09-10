import BlogList from './Component';
import Fallback from './Fallback';

export default function Con({ topic }: { topic: string }) {
  return (
    <Fallback>
      <BlogList topic={topic} />
    </Fallback>
  );
}
