import NodeCache from 'node-cache';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const MAKE_LIST_POSTS_PARAM = (repo: string) => `
  query {
    viewer {
      repository(name: "${repo}") {
        folders: object(expression: "main:pages/blog") {
          ... on Tree {
            entries {
              name
              type
            }
          }
        }
      }
    }
  }
`;

async function listPostsFromGithub(config: RequestInit, REPO_NAME: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: MAKE_LIST_POSTS_PARAM(REPO_NAME) }),
      ...config,
    });

    const data = await response.json();

    if (!data || !data.data) {
      return { error: true, data: data.errors };
    }

    // Filtra apenas os diretórios (type === 'tree')
    const folders = data.data.viewer.repository.folders.entries.filter(
      (entry: any) => entry.type === 'tree'
    );

    return folders.map((folder: any) => folder.name);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function listPosts(REPO_NAME: string): Promise<string[]> {
  const key = `githubData-posts-${REPO_NAME}`;
  let data = cache.get(key);

  if (!data) {
    data = await listPostsFromGithub({ next: { revalidate: 86400 } }, REPO_NAME || '');
    cache.set(key, data);
  }

  return data as string[];
}
