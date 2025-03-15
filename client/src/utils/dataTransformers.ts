import { Comments, GitComments, GitIssues, Issues } from "../types/issueTypes";
import { GitUser, User } from "../types/userTypes";

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
