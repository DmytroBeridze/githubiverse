import { GitIssues, Issues } from "../types/issueTypes";

export const transformGitIssue = (data: GitIssues): Issues => ({
  title: data.title,
  user: data.user.login,
  fullTitle: data.body,
  state: data.state,
  comments: data.comments,
  commentsUrl: data.comments_url,
  createdAt: data.created_at,
});
