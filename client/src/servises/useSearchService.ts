/*
Это будет единый сервис, который будет включать несколько методов:

    getRepoByName(repoName: string): Для поиска репозитория по названию.
    getIssuesForRepo(repoName: string): Для поиска issues в конкретном репозитории.


*/
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import {
  transformGitComments,
  transformGitIssue,
  transformRepo,
  transformUsers,
  transformUserWithRepo,
} from "../utils/dataTransformers";
import { GitComments, GitIssues, Issues } from "../types/issueTypes";
import { User, UserWithRepo } from "../types/userTypes";
import { RepoType, GitRepoType } from "../types/repoTypes";

const useSearchService = () => {
  const token = process.env.REACT_APP_TOKEN;

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
  const [authors, setAuthors] = useState<User[]>([]);
  const [author, setAuthor] = useState<UserWithRepo | null>(null);
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [issue, setIssue] = useState<Issues[]>([]);
  const [pullReq, setPullReq] = useState<Issues[]>([]);

  //--------------------------------------- random issue
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

  // -----------------------------------------comments
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

  // ---------------------------------------random users
  // const getUsers = async () => {
  //   const URL =
  //     "https://api.github.com/search/users?q=followers:>10&per_page=5";

  //   const response = await sendRequest(URL);

  //   if (!response || !response.items) {
  //     console.error("Error after get userlist");
  //   }

  //   try {
  //     const detailed = await Promise.all(
  //       response.items.map((user: { url: string }) => {
  //         const userData = sendRequest(user.url);
  //         return userData ?? null; // Если `sendRequest` вернёт undefined, заменяем на `null`
  //       })
  //     );
  //     const validUsers = detailed.filter((user) => user !== null);
  //     setAuthors(validUsers);
  //   } catch (error) {
  //     console.error("Error after get userlist");
  //   }
  // };
  const getRandomUsers = async () => {
    const URL =
      "https://api.github.com/search/users?q=followers:>100&per_page=5";

    try {
      const response = await sendRequest(URL);

      if (!response || !response.items) {
        console.log("No such users");
        return;
      }

      const usersPromises = response.items.map((elem: { url: string }) =>
        sendRequest(elem.url)
      );

      const usersExtended = await Promise.all(usersPromises);

      // Перевірка якщо API поверне некоректні дані
      const validUsers = usersExtended.filter(
        (user) => user !== null && user !== undefined
      );

      const transformData = validUsers.map((elem) => transformUsers(elem));

      setAuthors(transformData);
    } catch (error) {
      console.log("Fecth error ");
    }
  };

  // -----------------------------------------getUsersWithRepo
  const getUserByName = async (user: string = "karpathy") => {
    // const getUserByName = async (user: string = "dmytroberidze") => {
    const URL = `https://api.github.com/search/users?q=${user}`;

    // !------------видалити Authorization: `token ${token}`
    try {
      const response = await sendRequest(URL, "GET", null, {
        Authorization: `token ${token}`,
      });

      if (!response || !response.items) {
        console.log("No such user");
        return;
      }
      const filtered = response.items.find(
        (elem: { type: string }) => elem.type === "User"
      );

      if (!filtered) {
        console.log(`No valid user found for "${user}".`);
        return;
      }

      const extendedUser = await sendRequest(filtered.url);

      if (!extendedUser) {
        console.log(`Failed to fetch details for user "${user}".`);
        return;
      }
      const transformData = transformUserWithRepo(extendedUser);
      setAuthor(transformData);

      const repositories = await getRepositories(user);
      const issues = await issuesQuantity(user);
      const requestsPull = await pullRequest(user);

      setRepos(repositories);
      setIssue(issues);
      setPullReq(requestsPull);

      // // ---star quantity
      // const starsUrl = `https://api.github.com/users/${user}/starred`;
      // const stars = await sendRequest(starsUrl);
    } catch (error) {
      console.error(`Error fetching user "${user}":`, error);
    }
  };

  // -----------------------------------get repositories
  const getRepositories = async (user: string) => {
    let page = 1;
    let allRepositories: RepoType[] = [];
    setRepos([]);

    while (true) {
      const repoUrl = `https://api.github.com/users/${user}/repos?per_page=10&page=${page}`;

      // !------------видалити Authorization: `token ${token}`
      const repositories = await sendRequest(repoUrl, "GET", null, {
        Authorization: `token ${token}`,
      });

      if (!repositories || repositories.length === 0) break;

      const transformRepositories = Array.isArray(repositories)
        ? repositories.map((elem: GitRepoType) => transformRepo(elem))
        : [];
      allRepositories.push(...transformRepositories);
      if (repositories.length < 10) break;

      page++;
      if (page > 2) break;
    }
    return allRepositories;
  };

  // ------------------------------------------issues quantity
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
    return issuesArr;
  };

  // ------------------------------------------------pull requests
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
    return request;
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
    getRandomUsers,
    authors,
    getUserByName,
    author,
    repos,
    issue,
    pullReq,
  };
};

export default useSearchService;
