import BlogList from './Component';
import Fallback from './Fallback';

export default function Con({ name }: { name: string }) {
  return (
    <Fallback>
      <BlogList name={name} />
    </Fallback>
  );
}
