import { requestGraphQL } from './graphqlClient';

const GET_ALL_REPOS = `
  query {
    viewer {
      repositories(first: 100) {
        nodes {
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
  }
`;

async function getReposByTopicGithub(config: RequestInit, TOPIC_NAME: string) {
  try {
    const data = await requestGraphQL(GET_ALL_REPOS, config);

    return data.viewer.repositories.nodes.filter((repo: any) => {
      return repo.repositoryTopics.nodes.some((element: any) => {
        return element.topic.name === TOPIC_NAME;
      });
    });
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

export default async function getReposByTopic(TOPIC_NAME: string) {
  return getReposByTopicGithub({ next: { revalidate: 86400 } }, TOPIC_NAME || '');
}
