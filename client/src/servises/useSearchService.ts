import { useState } from "react";
import { useApi } from "../hooks/useApi";
import {
  transformGitComments,
  transformGitIssue,
  transformUsers,
} from "../utils/dataTransformers";
import { GitComments, GitIssues, Issues } from "../types/issueTypes";
import { User } from "../types/userTypes";

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
  const [randomIssuesError, setRandomIssuesError] = useState<string | null>(
    null
  );
  const [authors, setAuthors] = useState<User[]>([]);

  //--------------------------------------- random issue
  const getRandomIssues = async () => {
    const URL =
      "https://api.github.com/search/issues?q=is:unlocked&sort=comments&order=desc&per_page=10&page=1";

    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------------------comments
  const getComments = async (URL: string) => {
    try {
      const response = await sendRequest(URL);

      if (response) {
        const transformData = response.map((elem: GitComments) =>
          transformGitComments(elem)
        );

        return transformData;
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  // ---------------------------------------random users
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

      const validUsers = usersExtended.filter(
        (user) => user !== null && user !== undefined
      );

      const transformData = validUsers.map((elem) => transformUsers(elem));

      setAuthors(transformData);
    } catch (error) {
      if (error instanceof Error) {
        setRandomIssuesError(error.message);
      }

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
    getRandomUsers,
    authors,
    randomIssuesError,
    setRandomIssuesError,
  };
};

export default useSearchService;
