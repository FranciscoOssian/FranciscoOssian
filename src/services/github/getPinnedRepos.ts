import NodeCache from 'node-cache';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const GET_PINNED_REPOS = `
  query {
    viewer {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            id
            stargazerCount
            primaryLanguage {
                name
            }
          }
        }
      }
    }
  }
`;

async function getPinnedReposGithub() {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query: GET_PINNED_REPOS }),
    });

    const data = await response.json();

    if (!data || !data.data || !data.data.viewer || !data.data.viewer.pinnedItems || !data.data.viewer.pinnedItems.nodes) {
      throw new Error('Unexpected API response');
    }

    return data.data.viewer.pinnedItems.nodes;

  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function getPinnedRepos() {
  const key = 'githubData-pinned-repos';
  let data = cache.get(key);

  if (!data) {
    data = await getPinnedReposGithub();
    cache.set(key, data);
  }

  return data;
}
