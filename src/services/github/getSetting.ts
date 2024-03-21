import NodeCache from 'node-cache';
import yamlToJSON from '../yaml';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const MAKE_GET_SETTING_PARAM = (repo: string, filePath: string) => `
  query {
    viewer {
      repository(name: "${repo}") {
        file: object(expression: "main:${filePath}") {
          ... on Blob {
            text
          }
        }
        lastCommit: ref(qualifiedName: "main") {
          target {
            ... on Commit {
              history(first: 1, path: "${filePath}") {
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

async function getPageFromGithub(config: RequestInit, REPO_NAME: string, FILE_FOLDER: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: MAKE_GET_SETTING_PARAM(REPO_NAME, FILE_FOLDER) }),
      ...config,
    });

    const data = await response.json();

    if (!data || !data.data) {
      return { error: true, data: data.errors };
    }

    return {
      content: await yamlToJSON(data.data.viewer.repository?.file?.text),
      lastCommit: data.data.viewer.repository.lastCommit,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function getSetting(
  REPO_NAME: string,
  FILE_FOLDER: string
): Promise<{ content: any; lastCommit: any }> {
  const key = `githubData-file-${REPO_NAME}-${FILE_FOLDER}`;
  let data = cache.get(key);

  if (!data) {
    data = await getPageFromGithub(
      { next: { revalidate: 86400 } },
      REPO_NAME || '',
      FILE_FOLDER || ''
    );
    cache.set(key, data);
  }

  return data as { content: any; lastCommit: any };
}
