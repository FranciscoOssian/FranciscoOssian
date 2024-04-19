const endpoint = "https://api.github.com/graphql";
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

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
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: GET_ALL_REPOS }),
      ...config,
    });

    const data = await response.json();

    if (!data || !data.data || !data.data.viewer.repositories.nodes) {
      throw new Error("Unexpected API response");
    }

    return data.data.viewer.repositories.nodes.filter((repo: any) => {
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
  return getReposByTopicGithub(
    { next: { revalidate: 86400 } },
    TOPIC_NAME || ""
  );
}
