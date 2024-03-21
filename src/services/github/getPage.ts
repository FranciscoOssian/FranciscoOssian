import NodeCache from 'node-cache';
import yamlToJSON from '../yaml';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

function makeSettingsPaths(folderPath: string) {
  const paths = [];
  const folders = folderPath.split('/');

  for (let i = folders.length; i >= 0; i--) {
    const path = folders.slice(0, i).join('/');
    paths.push(`${path}/settings.yaml`);
  }

  return paths;
}

const MAKE_GET_PAGE_PARAM = (repo: string, pageFolder: string) => `
  query {
    viewer {
      repository(name: "${repo}") {
        pageFolder: object(expression: "main:${pageFolder}") {
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
              history(first: 1, path: "${pageFolder}") {
                edges {
                  node {
                    committedDate
                  }
                }
              }
            }
          }
        }
        ${makeSettingsPaths(pageFolder).map(
          (path, index) => `
        settings${index}: object(expression: "main:${path}") {
          ... on Blob {
            text
          }
        }
        \n`
        )}
      }
    }
  }
`;

async function getPageFromGithub(config: RequestInit, REPO_NAME: string, POST_FOLDER: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: MAKE_GET_PAGE_PARAM(REPO_NAME, POST_FOLDER) }),
      ...config,
    });

    const data = await response.json();

    if (!data || !data.data) {
      return { error: true, data: data.errors };
    }

    let mergedSettings = {};

    for (const propName in data.data.viewer.repository) {
      if (propName.startsWith('settings')) {
        mergedSettings = {
          ...(await yamlToJSON(data.data.viewer.repository[propName]?.text)),
          ...mergedSettings,
        };
      }
    }

    return {
      content:
        data.data.viewer.repository?.pageFolder?.entries?.find((e: any) => e.name === 'content.md')
          ?.object?.text ?? '',
      settings: mergedSettings,
      lastCommit: data.data.viewer.repository.lastCommit,
      path: POST_FOLDER,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function getPage(
  REPO_NAME: string,
  POST_FOLDER: string
): Promise<{ name: string; content: any; settings: any; lastCommit: any }> {
  const key = `githubData-post-${REPO_NAME}-${POST_FOLDER}`;
  let data = cache.get(key);

  if (true) {
    data = await getPageFromGithub(
      { next: { revalidate: 86400 } },
      REPO_NAME || '',
      POST_FOLDER || ''
    );
    cache.set(key, data);
  }

  return data as { name: string; content: any; settings: any; lastCommit: any };
}
