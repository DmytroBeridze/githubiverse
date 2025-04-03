import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { ExtendedGitRepoType, ExtendedRepoType } from "../types/repoTypes";
import { transformExtendedRepo } from "../utils/dataTransformers";

export const useRepoByName = () => {
  const token = process.env.REACT_APP_TOKEN;

  const { sendRequest, clearError, clearMessage, error, loading, message } =
    useApi();
  const [repo, setRepo] = useState<ExtendedRepoType[] | null>(null);
  const [repoError, setRepoError] = useState<string | null>(null);

  const getRepoByName = async (name: string) => {
    const URL = `https://api.github.com/search/repositories?q=${name}&per_page=5`;

    try {
      const response = await sendRequest(URL);

      if (!response || !response.items || response.items.length === 0) {
        throw new Error("No such this repo");
      }

      const transformedData = response.items.map(
        (repo: ExtendedGitRepoType) => {
          return transformExtendedRepo(repo);
        }
      );

      setRepo(transformedData);
    } catch (error) {
      if (error instanceof Error) {
        setRepoError(error.message);
        console.error(error.message);
      }
    }
  };

  return {
    getRepoByName,
    clearError,
    clearMessage,
    error,
    loading,
    message,
    repo,
    repoError,
    setRepoError,
  };
};
