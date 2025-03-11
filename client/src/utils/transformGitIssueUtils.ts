import { Comments, GitComments, GitIssues, Issues } from "../types/issueTypes";

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
});

export const transformGitComments = (data: GitComments): Comments => ({
  userLogin: data.user.login,
  avatar: data.user.avatar_url,
  createdAt: data.created_at,
  body: data.body,
});
