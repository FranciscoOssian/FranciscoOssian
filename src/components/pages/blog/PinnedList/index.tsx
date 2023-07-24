import BlogList from './Component';
import Fallback from './Fallback';

export default function Con() {
  return (
    <Fallback>
      <BlogList />
    </Fallback>
  );
}
