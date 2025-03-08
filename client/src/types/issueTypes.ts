export type GitIssues = {
  title: string;
  user: { login: string };
  body: string;
  state: string;
  comments: number;
  comments_url: string;
  created_at: string;
};

export type Issues = {
  title: string;
  user: string;
  fullTitle: string;
  state: string;
  comments: number;
  commentsUrl: string;
  createdAt: string;
};
// export type Issues = {
//   title: string;
//   user: { login: string };
//   fullTitle: string;
//   state: string;
//   comments: number;
//   commentsUrl: string;
//   createdAt: string;
// };
