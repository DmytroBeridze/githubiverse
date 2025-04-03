import { useState } from "react";
import { GitIssues, Issues } from "../types/issueTypes";
import { useApi } from "../hooks/useApi";
import { transformGitIssue } from "../utils/dataTransformers";

const useIssueService = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [issue, setIssue] = useState<Issues[]>([]);
  const [issueError, setIssueError] = useState<string | null>(null);
  const [repoIssues, setRepoIssues] = useState<Issues[]>([]);
  const [repoIssuesError, setrepoIssuesErrorError] = useState<string | null>(
    null
  );
  const [pullReq, setPullReq] = useState<Issues[]>([]);
  const [pullRequestsError, setpullRequestsError] = useState<string | null>(
    null
  );

  const { sendRequest, loading, error } = useApi();

  // ---------------------------------issues quantity
  const issuesQuantity = async (user: string) => {
    let page = 1;
    let issuesArr: Issues[] = [];
    setIssue([]);

    try {
      while (true) {
        const issuesUrl = `https://api.github.com/search/issues?q=author:${user}+type:issue&per_page=100&page=${page}`;

        const issues = await sendRequest(issuesUrl);
        if (!issues || !issues.items || issues.items.length === 0) break;

        const transform = Array.isArray(issues.items)
          ? issues.items.map((data: GitIssues) => transformGitIssue(data))
          : [];

        issuesArr.push(...transform);

        page++;
        if (page > 2) break;
      }
    } catch (error) {
      setIssueError("Error loading issues");
    }
    setIssue(issuesArr);
  };

  // ---------------------------------------pull requests
  const pullRequest = async (user: string) => {
    let page = 1;
    const request: Issues[] = [];

    try {
      while (true) {
        const pullRequestsUrl = `https://api.github.com/search/issues?q=author:${user}+type:pr&per_page=100&page=${page}`;
        const pullRequests = await sendRequest(pullRequestsUrl);
        if (
          !pullRequests ||
          !pullRequests.items ||
          pullRequests.items.length === 0
        )
          break;

        const transform = Array.isArray(pullRequests.items)
          ? pullRequests.items.map((data: GitIssues) => transformGitIssue(data))
          : [];

        request.push(...transform);

        page++;
        if (page > 2) break;
      }
    } catch (error) {
      setpullRequestsError("Error loading pull requests");
    }
    setPullReq(request);
  };

  // ----------all issues from repo
  const issuesByRepo = async (url: string) => {
    try {
      const response = await sendRequest(url);

      if (response.length === 0) {
        setrepoIssuesErrorError("No such issues");
      }

      const transform = Array.isArray(response)
        ? response.map((elem: GitIssues) => {
            return transformGitIssue(elem);
          })
        : [];
      setRepoIssues(transform);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    issuesQuantity,
    issue,
    pullRequest,
    pullReq,
    issueError,
    pullRequestsError,
    issuesByRepo,
    repoIssues,
    repoIssuesError,
    loading,
    error,
  };
};

export default useIssueService;
