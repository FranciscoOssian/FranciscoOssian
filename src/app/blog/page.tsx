import List from '@/components/common/List';
import listPages from '@/services/github/listPages';
import getPage from '@/services/github/getPage';
import yamlToJSON from '@/services/yaml';

export default async function Home() {
  let list: any = await listPages('foln-cms-md', 'blog');

  list = await Promise.all(
    list.map(async (name: string) => ({
      slug: name,
      ...(await getPage('foln-cms-md', `pages/blog/${name}`)),
    }))
  );

  list = await Promise.all(
    list.map(async (item: any) => {
      const settings = await yamlToJSON(item.yaml[0]?.object?.text);
      return {
        title: settings.title,
        description: settings.description,
        image: settings.image,
        link: `/blog/${item?.slug}`,
        tags: settings.tags ?? [],
      };
    })
  );

  return (
    <main>
      <List background="transparent" list={list} />
      <br />
    </main>
  );
}
