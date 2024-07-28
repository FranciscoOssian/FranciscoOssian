import { MetadataRoute } from 'next';

import listPages from '../services/github/listPages';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts: string[] = await listPages('foln-cms-md', 'blog');
  return [
    {
      url: 'https://www.foln.dev/',
    },
    {
      url: 'https://www.foln.dev/blog',
    },
    ...posts.map((name: string) => ({
      url: `https://www.foln.dev/blog/${name}`,
    })),
  ];
};

export default sitemap;
