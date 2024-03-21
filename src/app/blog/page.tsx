import styles from '@/styles/page.module.scss';
import Posts from '@/components/pages/blog/Posts';
import listPosts from '@/services/github/listPosts';
import getPage from '@/services/github/getPage';

export default async function Home() {
  let list: any = await listPosts('foln-cms-md');

  list = await Promise.all(
    list.map(async (name: string) => ({
      post: await getPage('foln-cms-md', `pages/blog/${name}`),
      name: name,
    }))
  );

  list = list.map(({ post, name }: any) => ({
    id: name,
    name: post?.settings?.title ?? name,
    url: `/blog/${name}`,
    description: post?.settings?.description ?? name,
  }));

  return (
    <main className={styles.main}>
      <Posts listPosts={list} />
      <br />
    </main>
  );
}
