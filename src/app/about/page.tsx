import MdToHTML from '@/components/common/MdToHtml';
import getPage from '@/services/github/getPage';
import styles from '@/styles/page.module.scss';

async function getPageData(): Promise<{ content: string; settings: any }> {
  return await getPage('foln-cms-md', 'pages/about');
}

export default async function Page() {
  const content = (await getPageData())?.content;
  return (
    <>
      <main className={styles.main}>
        <MdToHTML text={content} />
      </main>
    </>
  );
}
