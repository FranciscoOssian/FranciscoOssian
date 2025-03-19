import yamlToJSON from '../yaml';
import { requestGraphQL } from './graphqlClient';

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
    const data = await requestGraphQL(MAKE_GET_POST_PARAM(REPO_NAME, POST_FOLDER), config);

    return {
      content: data.viewer.repository.postFolder.entries.find((e: any) => e.name === 'content.md')
        .object.text,
      settings: await yamlToJSON(
        data.viewer.repository.postFolder.entries.find((e: any) => e.name === 'settings.yaml')
          .object.text
      ),
      lastCommit: data.viewer.repository.lastCommit,
      name: POST_FOLDER,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

export default async function getPost(
  REPO_NAME: string,
  POST_FOLDER: string
): Promise<{ name: string; content: any; settings: any; lastCommit: any }> {
  const data = await getPostFromGithub(
    { next: { revalidate: 86400 } },
    REPO_NAME || '',
    POST_FOLDER || ''
  );

  return data as { name: string; content: any; settings: any; lastCommit: any };
}
