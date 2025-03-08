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
import { transformGitIssue } from "../utils/transformGitIssueUtils";
import { GitIssues, Issues } from "../types/issueTypes";
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

  // random issue
  const getRandomIssues = async () => {
    const URL =
      "https://api.github.com/search/issues?q=is:unlocked&sort=comments&order=desc&per_page=10&page=1";

    const response = await sendRequest(URL);
    if (response) {
      console.log(response.items);
      const transformData = response.items.map((elem: GitIssues) =>
        transformGitIssue(elem)
      );
      setRandomIssues(transformData);
    }
  };

  console.log(randomIssues);
  return {
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
    getRandomIssues,
  };
};

export default useSearchService;
