import List from "@/components/common/List";
import listPages from "@/services/github/listPages";
import getPage from "@/services/github/getPage";
import yamlToJSON from "@/services/yaml";

export default async function Home() {
  let list: any = await listPages("foln-cms-md", "blog");

  console.log(list);

  list = await Promise.all(
    list.map(async (name: string) => ({
      slug: name,
      ...(await getPage("foln-cms-md", `pages/blog/${name}`)),
    }))
  );

  console.log(list[0].yaml);

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

  console.log(list);

  return (
    <main>
      <List background="transparent" list={list} />
      <br />
    </main>
  );
}
