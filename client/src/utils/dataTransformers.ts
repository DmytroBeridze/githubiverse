import { Comments, GitComments, GitIssues, Issues } from "../types/issueTypes";
import {
  ExtendedGitRepoType,
  ExtendedRepoType,
  GitRepoType,
  RepoType,
} from "../types/repoTypes";
import {
  GitUser,
  GitUserWithRepo,
  User,
  UserWithRepo,
} from "../types/userTypes";

export const transformGitIssue = (data: GitIssues): Issues => ({
  title: data.title,
  user: data.user.login,
  userType: data.user.type,
  fullTitle: data.body,
  state: data.state,
  comments: data.comments,
  commentsUrl: data.comments_url,
  createdAt: data.created_at,
  avatar: data.user.avatar_url,
  linkGit: data.html_url,
  id: data.id,
});

export const transformGitComments = (data: GitComments): Comments => ({
  userLogin: data.user.login,
  avatar: data.user.avatar_url,
  createdAt: data.created_at,
  body: data.body,
  id: data.id,
  userType: data.user.type,
});

export const transformUsers = (data: GitUser): User => ({
  avatar: data.avatar_url,
  name: data.name,
  login: data.login,
  company: data.company,
  type: data.type,
  github: data.html_url,
  bio: data.bio,
  publicRepos: data.public_repos,
  followers: data.followers,
  location: data.location,
  createdAt: data.created_at,
});

export const transformUserWithRepo = (data: GitUserWithRepo): UserWithRepo => ({
  avatar: data.avatar_url,
  name: data.name,
  login: data.login,
  company: data.company,
  type: data.type,
  github: data.html_url,
  bio: data.bio,
  publicRepos: data.public_repos,
  followers: data.followers,
  location: data.location,
  createdAt: data.created_at,
  reposUrl: data.repos_url,
  following: data.following,
  email: data.email,
});

export const transformRepo = (data: GitRepoType): RepoType => ({
  id: data.id,
  createdAt: data.created_at,
  description: data.description,
  name: data.name,
  htmlUrl: data.html_url,
  language: data.language,
  openIssues: data.open_issues,
  watchers: data.watchers,
  issuesUrl: data.issues_url,
});

export const transformExtendedRepo = (
  data: ExtendedGitRepoType
): ExtendedRepoType => ({
  id: data.id,
  createdAt: data.created_at,
  description: data.description,
  name: data.name,
  htmlUrl: data.html_url,
  language: data.language,
  watchers: data.watchers,
  issuesUrl: data.issues_url,
  ownerId: data.owner.id,
  ownerLogin: data.owner.login,
  ownerAwatar: data.owner.avatar_url,
  ownerGithub: data.owner.html_url,
  ownerType: data.owner.type,
});
