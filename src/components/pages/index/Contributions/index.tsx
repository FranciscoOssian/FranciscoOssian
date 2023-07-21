import Contributions from './Component';
import Fallback from './Fallback';

export default function Con() {
  return (
    <Fallback>
      <Contributions />
    </Fallback>
  );
}
