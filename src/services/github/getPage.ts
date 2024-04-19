const endpoint = "https://api.github.com/graphql";
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const MAKE_GET_PAGE_PARAM = (repo: string, pageFolder: string) => `
  query {
    viewer {
      repository(name: "${repo}") {
        pageFolder: object(expression: "main:${pageFolder}") {
          ... on Tree {
            entries {
              name
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
        lastCommit: ref(qualifiedName: "main") {
          target {
            ... on Commit {
              history(first: 1, path: "${pageFolder}") {
                edges {
                  node {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

type FileObject = {
  name: string;
  object: any;
};

type resp = {
  markdonw: FileObject[];
  yaml: FileObject[];
  lastCommit: any;
  path: string;
};

async function getPageFromGithub(
  config: RequestInit,
  REPO_NAME: string,
  PAGE_FOLDER: string
): Promise<resp> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: MAKE_GET_PAGE_PARAM(REPO_NAME, PAGE_FOLDER),
      }),
      ...config,
    });

    const data = await response.json();

    if (!data || !data.data) {
      throw { error: true, data: data.errors };
    }

    return {
      markdonw: data.data.viewer.repository?.pageFolder?.entries?.filter(
        (e: { name: string }) => e.name.includes(".md")
      ),
      yaml: data.data.viewer.repository?.pageFolder?.entries?.filter(
        (e: { name: string }) =>
          e.name.includes(".yaml") || e.name.includes(".yml")
      ),
      lastCommit: data.data.viewer.repository.lastCommit,
      path: PAGE_FOLDER,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}

export default async function getPage(
  REPO_NAME: string,
  PAGE_FOLDER: string
): Promise<resp> {
  const data = await getPageFromGithub(
    { next: { revalidate: 86400 } },
    REPO_NAME || "",
    PAGE_FOLDER || ""
  );

  return data;
}
