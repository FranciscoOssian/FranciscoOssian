import styles from '@/styles/page.module.scss';
import PinnedList from '@/components/pages/blog/PinnedList';

export default function Home() {
  return (
    <main className={styles.main}>
      teste 2 from blog/
      <br />
      tag name = portifolio
      <br />
      esperando aparecer aqui, pois chalk ja tem pelo menos
      <PinnedList />
      <br />
    </main>
  );
}
