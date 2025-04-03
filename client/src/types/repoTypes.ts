export type GitRepoType = {
  id: number;
  created_at: string;
  description: string;
  name: string;
  html_url: string;
  language: string;
  open_issues: number;
  watchers: number;
  issues_url: string;
};

export type RepoType = {
  id: number;
  createdAt: string;
  description: string;
  name: string;
  htmlUrl: string;
  language: string;
  openIssues: number;
  watchers: number;
  issuesUrl: string;
};

type Owner = {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  id: number;
};

export type ExtendedGitRepoType = Omit<GitRepoType, "open_issues"> & {
  owner: Owner;
};

export type ExtendedRepoType = {
  id: number;
  createdAt: string;
  description: string;
  name: string;
  htmlUrl: string;
  language: string;
  watchers: number;
  issuesUrl: string;

  ownerLogin: string;
  ownerAwatar: string;
  ownerGithub: string;
  ownerType: string;
  ownerId: number;
};
