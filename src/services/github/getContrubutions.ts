import NodeCache from 'node-cache';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
const now = new Date().toISOString();

const GET_CONTRIBUTIONS = `
  query {
    viewer {
      contributionsCollection(from: "${oneYearAgo}", to: "${now}") {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;


async function getData(config: any) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query: GET_CONTRIBUTIONS }),
      ...config
    });

    const data = await response.json();

    if (!data || !data.data || !data.data.viewer || !data.data.viewer.contributionsCollection || !data.data.viewer.contributionsCollection.contributionCalendar) {
      throw new Error('Unexpected API response');
    }

    return data.data.viewer.contributionsCollection.contributionCalendar;

  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function getContributions() {
  const key = 'githubData-contribuitions';
  let data = cache.get(key);

  if (!data) {
    data = await getData(
        { cache: 'no-store' }
    );
    cache.set(key, data);
  }

  return data;
}
