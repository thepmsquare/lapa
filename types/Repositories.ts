type SourceCodeLink = {
  value: string;
  isPrivate: boolean;
};
type LatestVersion = {
  version?: string;
  linkToFetchVersion: string;
  type: "pip" | "npm" | "empty";
  publicLink: string;
};
type Repository = {
  id: string;
  repoName: string;
  latestVersion: LatestVersion;
  repoOwner: "thePmSquare" | "Lav Sharma" | "Amish Palkar" | "Aaditya Shetty";
  sourceCodeLink: SourceCodeLink;
  previewLink: string | null;
  programmingLanguage: "Python" | "Node.js" | "Docker";
};

type Repositories = Repository[];

export type { Repositories, Repository };
