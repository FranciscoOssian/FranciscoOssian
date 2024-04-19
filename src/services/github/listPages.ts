const endpoint = "https://api.github.com/graphql";
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const MAKE_LIST_PAGES_PARAM = (repo: string, path: string) => `
  query {
    viewer {
      repository(name: "${repo}") {
        folders: object(expression: "main:pages/${path}") {
          ... on Tree {
            entries {
              name
              type
            }
          }
        }
      }
    }
  }
`;

async function listPagesFromGithub(
  config: RequestInit,
  REPO_NAME: string,
  path: string
) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: MAKE_LIST_PAGES_PARAM(REPO_NAME, path) }),
      ...config,
    });

    const data = await response.json();

    if (!data || !data.data) {
      return { error: true, data: data.errors };
    }

    // Filtra apenas os diretórios (type === 'tree')
    const folders = data.data.viewer.repository.folders.entries.filter(
      (entry: any) => entry.type === "tree"
    );

    return folders.map((folder: any) => folder.name);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

export default async function listPosts(
  REPO_NAME: string,
  path: string
): Promise<string[]> {
  return (await listPagesFromGithub(
    { next: { revalidate: 86400 } },
    REPO_NAME || "",
    path ?? ""
  )) as string[];
}
