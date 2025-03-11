/*
Это будет единый сервис, который будет включать несколько методов:

    getRandomIssues(): Для получения случайных issues.
    getUserByName(username: string): Для поиска пользователя по имени.
    getRepoByName(repoName: string): Для поиска репозитория по названию.
    getIssuesForRepo(repoName: string): Для поиска issues в конкретном репозитории.
    getIssuesByLabel(label: string): Для поиска issues по метке, если это нужно.


*/
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import {
  transformGitComments,
  transformGitIssue,
} from "../utils/transformGitIssueUtils";
import { Comments, GitComments, GitIssues, Issues } from "../types/issueTypes";

const useSearchService = () => {
  const {
    sendRequest,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  } = useApi();

  const [randomIssues, setRandomIssues] = useState<Issues[]>([]);
  // const [usersComments, setUsersComments] = useState<Comments[]>([]);

  // random issue
  const getRandomIssues = async () => {
    const URL =
      "https://api.github.com/search/issues?q=is:unlocked&sort=comments&order=desc&per_page=10&page=1";

    // const URL =
    // "https://api.github.com/search/issues?q=is:unlocked+created:>2024-01-01&sort=created&order=desc&per_page=20&page=1";

    const response = await sendRequest(URL);
    if (response) {
      const filtaredData = response.items.filter(
        (elem: GitIssues) =>
          elem.user.type === "User" &&
          !["dependabot", "github-actions"].includes(elem.user.login)
      );
      const transformData = filtaredData.map((elem: GitIssues) =>
        transformGitIssue(elem)
      );
      setRandomIssues(transformData);
    }
  };

  // comments
  const getComments = async (URL: string) => {
    const response = await sendRequest(URL);
    if (response) {
      const transformData = response.map((elem: GitComments) =>
        transformGitComments(elem)
      );

      return transformData;
    }
    return [];
  };

  return {
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
    randomIssues,
    getRandomIssues,
    getComments,
    // usersComments,
  };
};

export default useSearchService;
