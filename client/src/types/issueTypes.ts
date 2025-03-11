export type GitIssues = {
  title: string;
  user: { login: string; avatar_url: string; type: string };
  body: string;
  state: string;
  comments: number;
  comments_url: string;
  created_at: string;
};

export type Issues = {
  title: string;
  user: string;
  userType: string;
  fullTitle: string;
  state: string;
  comments: number;
  commentsUrl: string;
  createdAt: string;
  avatar: string;
};

export type GitComments = {
  user: { login: string; avatar_url: string };
  created_at: string;
  body: string;
};

export type Comments = {
  userLogin: string;
  avatar: string;
  createdAt: string;
  body: string;
};
