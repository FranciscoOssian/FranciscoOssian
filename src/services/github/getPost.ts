import NodeCache from 'node-cache';
import yamlToJSON from '../yaml';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const MAKE_GET_POST_PARAM = (repo: string, postFolder: string) => `
  query {
    viewer {
      repository(name: "${repo}") {
        postFolder: object(expression: "main:${postFolder}") {
          ... on Tree {
            entries {
              name
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
        lastCommit: ref(qualifiedName: "main") {
          target {
            ... on Commit {
              history(first: 1, path: "${postFolder}") {
                edges {
                  node {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function getPostFromGithub(config: RequestInit, REPO_NAME: string, POST_FOLDER: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: MAKE_GET_POST_PARAM(REPO_NAME, POST_FOLDER) }),
      ...config,
    });

    const data = await response.json();

    if (!data || !data.data) {
      return { error: true, data: data.errors };
    }
    return {
      content: data.data.viewer.repository.postFolder.entries.find(
        (e: any) => e.name === 'content.md'
      ).object.text,
      settings: await yamlToJSON(
        data.data.viewer.repository.postFolder.entries.find((e: any) => e.name === 'settings.yaml')
          .object.text
      ),
      lastCommit: data.data.viewer.repository.lastCommit,
      name: POST_FOLDER,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function getPost(
  REPO_NAME: string,
  POST_FOLDER: string
): Promise<{ name: string; content: any; settings: any; lastCommit: any }> {
  const key = `githubData-post-${REPO_NAME}-${POST_FOLDER}`;
  let data = cache.get(key);

  if (!data) {
    data = await getPostFromGithub(
      { next: { revalidate: 86400 } },
      REPO_NAME || '',
      POST_FOLDER || ''
    );
    cache.set(key, data);
  }

  return data as { name: string; content: any; settings: any; lastCommit: any };
}
