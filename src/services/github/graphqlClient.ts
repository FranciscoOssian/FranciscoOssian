const endpoint = 'https://api.github.com/graphql';
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

export async function requestGraphQL(query: string, config: RequestInit) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
    ...config,
  });

  const data = await response.json();

  if (!data || !data.data) {
    throw new Error('Erro na resposta da API');
  }

  return data.data;
}
