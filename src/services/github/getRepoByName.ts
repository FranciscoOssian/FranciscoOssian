import { requestGraphQL } from './graphqlClient';

const MAKE_GET_REPO_PARAM = (repo: string) => `
  query {
    viewer {
      repository(name: "${repo}"){
        name
        url
        description
        primaryLanguage {
          name
        }
        stargazers {
          totalCount
        }
        object(expression: "main:README.md") {
          ... on Blob {
            text
          }
        }
        ref(qualifiedName: "main"){
          target{
            ... on Commit {
              history(first: 3, path: "README.md") {
                edges {
                  node {
                    committedDate
                  }
                }
              }
            }
          }
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
          }
        }
      }
    }
  }
`;

async function getReposByNameGithub(config: RequestInit, REPO_NAME: string) {
  try {
    const data = await requestGraphQL(MAKE_GET_REPO_PARAM(REPO_NAME), config);

    return data.viewer.repository;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

export default async function getReposByName(REPO_NAME: string) {
  return getReposByNameGithub({ next: { revalidate: 86400 } }, REPO_NAME || '');
}
