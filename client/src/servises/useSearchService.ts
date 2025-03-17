/*
Это будет единый сервис, который будет включать несколько методов:

    getUserByName(username: string): Для поиска пользователя по имени.
    getRepoByName(repoName: string): Для поиска репозитория по названию.
    getIssuesForRepo(repoName: string): Для поиска issues в конкретном репозитории.


*/
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import {
  transformGitComments,
  transformGitIssue,
  transformUsers,
} from "../utils/dataTransformers";
import { Comments, GitComments, GitIssues, Issues } from "../types/issueTypes";
import { User } from "../types/userTypes";

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
  const [authors, setAuthors] = useState<User[]>([]);
  //------- random issue
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

  // --------comments
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

  // ---------random users
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

  const getUsers = async () => {
    const URL =
      "https://api.github.com/search/users?q=followers:>10&per_page=10";

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
    getUsers,
    authors,
  };
};

export default useSearchService;
