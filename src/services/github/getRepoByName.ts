import NodeCache from 'node-cache';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

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
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: MAKE_GET_REPO_PARAM(REPO_NAME) }),
      ...config,
    });

    const data = await response.json();

    if (!data || !data.data) {
      //throw new Error('Unexpected API response');
      return { error: true, data: data.errors }
    }
    return data.data.viewer.repository;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function getReposByName(REPO_NAME: string) {
  const key = `githubData-repo-by-name-${REPO_NAME}`;
  let data = cache.get(key);

  if (!data) {
    data = await getReposByNameGithub({ next: { revalidate: 86400 } }, REPO_NAME || '');
    cache.set(key, data);
  }

  return data;
}
