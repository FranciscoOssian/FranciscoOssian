import AboveMin from '@/components/common/AboveMin';
import Card from '@/components/common/Card';
import PageFrame from '@/components/common/PageFrame';
import getPage from '@/services/github/getPage';
import listPages from '@/services/github/listPages';
import yamlToJSON from '@/services/yaml';
import Link from 'next/link';

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
      <AboveMin title="Blog" />
      <PageFrame>
        <ul className="m-4 flex gap-3 flex-wrap justify-between">
          {list.map((item: any, i: number) => (
            <li key={i}>
              <Link href={`${item.link}`}>
                <Card
                  headerText={item.title}
                  subHeaderText={item.description}
                  titleText={item.keywords}
                  subTitleText={''}
                  supportingText={''}
                />
              </Link>
            </li>
          ))}
        </ul>
      </PageFrame>
      <br />
    </main>
  );
}
