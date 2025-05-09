import yamlToJSON from '../yaml';
import { requestGraphQL } from './graphqlClient';

const MAKE_GET_SETTINGS_PARAM = (repo: string, filePath: string) => `
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

async function getSettingsFromGithub(config: RequestInit, REPO_NAME: string, FILE_FOLDER: string) {
  try {
    const data = await requestGraphQL(MAKE_GET_SETTINGS_PARAM(REPO_NAME, FILE_FOLDER), config);

    return {
      content: await yamlToJSON(data.viewer.repository?.file?.text),
      lastCommit: data.viewer.repository.lastCommit,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

export default async function getSetting(REPO_NAME: string, FILE_FOLDER: string): Promise<any> {
  return getSettingsFromGithub({ next: { revalidate: 86400 } }, REPO_NAME || '', FILE_FOLDER || '');
}
