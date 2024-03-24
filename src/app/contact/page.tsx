import RepoList from '@/components/common/RepoList';
import getSetting from '@/services/github/getSetting';
import styles from '@/styles/page.module.scss';

async function getPageData(): Promise<{ content: any; lastCommit: any }> {
  return await getSetting('foln-cms-md', 'pages/contact/settings.yaml');
}

export default async function Home() {
  const { content } = await getPageData();
  return (
    <main className={styles.main}>
      <RepoList showPublic={false} repos={content.page.contactList} />
    </main>
  );
}
