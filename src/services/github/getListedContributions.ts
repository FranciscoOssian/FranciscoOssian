import NodeCache from 'node-cache';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

const GET_CONTRIBUTION_ACTIVITY = `
  query {
    viewer {
      contributionsCollection(from: "${oneMonthAgo.toISOString()}", to: "${new Date().toISOString()}") {
        commitContributionsByRepository {
          repository {
            name
            url
          }
          contributions(first: 1) {
            edges {
              node {
                occurredAt
                commitCount
              }
            }
          }
        }
        issueContributions(first: 1) {
          edges {
            node {
              occurredAt
              issue {
                title
                url
              }
            }
          }
        }
        pullRequestContributions(first: 1) {
          edges {
            node {
              occurredAt
              pullRequest {
                title
                url
              }
            }
          }
        }
        pullRequestReviewContributions(first: 1) {
          edges {
            node {
              occurredAt
              pullRequestReview {
                pullRequest {
                  title
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function getContributionActivityGithub(config: RequestInit) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query: GET_CONTRIBUTION_ACTIVITY }),
      ...config
    });

    const data = await response.json();

    if (!data || !data.data || !data.data.viewer || !data.data.viewer.contributionsCollection) {
      throw new Error('Unexpected API response');
    }

    return data.data.viewer.contributionsCollection;

  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function getContributionActivity() {
  const key = 'githubData-contribution-activity';
  let data = cache.get(key);

  if (!data) {
    data = await getContributionActivityGithub(
      { next: {revalidate: 86400} }
    );
    cache.set(key, data);
  }

  return data;
}
