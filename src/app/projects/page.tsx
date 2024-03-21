import styles from '@/styles/page.module.scss';
import ReposByTopic from '@/components/pages/blog/ReposByTopic';

export default function Projects() {
  return (
    <main className={styles.main}>
      <ReposByTopic topic="foln-project-content" />
      <br />
    </main>
  );
}
