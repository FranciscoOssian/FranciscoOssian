import { requestGraphQL } from './graphqlClient';

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

async function getPinnedReposGithub(config: RequestInit) {
  try {
    const data = await requestGraphQL(GET_PINNED_REPOS, config);

    return data.viewer.pinnedItems.nodes;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

export default async function getPinnedRepos() {
  return await getPinnedReposGithub({ next: { revalidate: 86400 } });
}
