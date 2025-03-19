import { string } from "yup";

export type GitUser = {
  avatar_url: string;
  name: string;
  login: string;
  company: string;
  type: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  location: string;
  created_at: string;
};

export type User = {
  avatar: string;
  name: string;
  login: string;
  company: string;
  type: string;
  github: string;
  bio: string;
  publicRepos: number;
  followers: number;
  location: string;
  createdAt: string;
};

export type GitUserWithRepo = GitUser & {
  repos_url: string;
  following: number;
};
export type UserWithRepo = User & {
  reposUrl: string;
  following: number;
};
