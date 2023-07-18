import { request } from 'graphql-request';
import NodeCache from 'node-cache';

const endpoint = 'https://api.github.com/graphql';

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const headers = {
  'Authorization': `Bearer ${token}`,
};

// Consulta para buscar seus repositórios pinados
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

// Consulta para buscar suas contribuições nos últimos 365 dias
const GET_CONTRIBUTIONS = `
  query {
    viewer {
      contributionsCollection(from: "${new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()}", to: "${new Date().toISOString()}") {
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

export async function getPinnedRepos() {
  try {
    const data: any = await request(endpoint, GET_PINNED_REPOS, undefined,  headers);
    return data.viewer.pinnedItems.nodes;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
  }
}

export async function getContributions() {
  try {
    const data: any = await request(endpoint, GET_CONTRIBUTIONS, undefined,  headers);
    return data.viewer.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
  }
}

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default async function handler(req: any, res: any) {
  const key = 'githubData';
  const timeInHours = 24;
  let data = cache.get(key);

  if (!data) {
    console.log('fetching...');
    const pinnedRepos = await getPinnedRepos();
    const contributions = await getContributions();
    data = {
        pinnedRepos, contributions
    }
    cache.set(key, data, timeInHours * 60 * 60);
    console.log('done!');
    console.clear();
  }

  res.status(200).json(data);
}
