import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { GitRepoType, RepoType } from "../types/repoTypes";
import { transformRepo } from "../utils/dataTransformers";

// ------------getPopularRepos

const usePopularRepo = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [popularRepos, setPopularRepos] = useState<RepoType[]>([]);
  const [popularReposError, setPopularReposRepoError] = useState<string | null>(
    null
  );

  const {
    sendRequest,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  } = useApi();

  const getPopularRepos = async () => {
    const URL =
      "https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc";
    // !------------видалити Authorization: `token ${token}`

    try {
      const response = await sendRequest(URL, "GET", null, {
        Authorization: `token ${token}`,
      });

      if (!response || !response.items || response.items === 0) {
        setPopularReposRepoError("No such repository");
      }

      const transformedRepo = response.items.map((elem: GitRepoType) =>
        transformRepo(elem)
      );
      setPopularRepos(transformedRepo);
    } catch (error) {
      if (error instanceof Error) {
        setPopularReposRepoError(error.message);
      }
      console.log(error);
    }
  };

  return {
    getPopularRepos,
    popularRepos,
    loading,
    popularReposError,
    setPopularReposRepoError,
  };
};

export default usePopularRepo;
