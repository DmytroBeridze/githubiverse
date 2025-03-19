import { useState } from "react";
import { GitIssues, Issues } from "../types/issueTypes";
import { useApi } from "../hooks/useApi";
import { transformGitIssue } from "../utils/dataTransformers";

const useIssueService = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [issue, setIssue] = useState<Issues[]>([]);
  const [pullReq, setPullReq] = useState<Issues[]>([]);
  const {
    sendRequest,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  } = useApi();

  // ---------------------------------issues quantity
  const issuesQuantity = async (user: string) => {
    let page = 1;
    let issuesArr: Issues[] = [];
    setIssue([]);

    while (true) {
      const issuesUrl = `https://api.github.com/search/issues?q=author:${user}+type:issue&per_page=100&page=${page}`;

      // !------------видалити Authorization: `token ${token}`
      const issues = await sendRequest(issuesUrl, "GET", null, {
        Authorization: `token ${token}`,
      });
      if (!issues || !issues.items || issues.items.length === 0) break;

      const transform = Array.isArray(issues.items)
        ? issues.items.map((data: GitIssues) => transformGitIssue(data))
        : [];

      issuesArr.push(...transform);

      page++;
      if (page > 2) break;
    }
    setIssue(issuesArr);
  };

  // ---------------------------------------pull requests
  const pullRequest = async (user: string) => {
    let page = 1;
    const request: Issues[] = [];

    while (true) {
      const pullRequestsUrl = `https://api.github.com/search/issues?q=author:${user}+type:pr&per_page=100&page=${page}`;
      // !------------видалити Authorization: `token ${token}`
      const pullRequests = await sendRequest(pullRequestsUrl, "GET", null, {
        Authorization: `token ${token}`,
      });
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
    setPullReq(request);
  };

  return {
    issuesQuantity,
    issue,
    pullRequest,
    pullReq,
  };
};

export default useIssueService;
