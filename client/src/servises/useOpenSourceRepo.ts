import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { transformExtendedRepo } from "../utils/dataTransformers";
import { ExtendedGitRepoType, ExtendedRepoType } from "../types/repoTypes";

const useOpenSourceRepo = () => {
  const { sendRequest, loading } = useApi();
  const [extendedRepo, setExtendedRepo] = useState<ExtendedRepoType[]>([]);
  const [extendedRepoError, setExtendedRepoError] = useState<string | null>(
    null
  );

  const getOpenSourceRepo = async (language: string) => {
    const URL = `https://api.github.com/search/repositories?q=language:${language}+is:public&sort=stars`;
    try {
      const response = await sendRequest(URL);

      if (!response || response.items === 0)
        setExtendedRepoError("No such repo");

      const transformedRepos = response.items.map((elem: ExtendedGitRepoType) =>
        transformExtendedRepo(elem)
      );

      setExtendedRepo(transformedRepos);
    } catch (error) {
      if (error instanceof Error) {
        setExtendedRepoError(error.message);
      }
      console.log(error);
    }
  };

  return {
    loading,
    getOpenSourceRepo,
    extendedRepo,
    extendedRepoError,
    setExtendedRepoError,
  };
};

export default useOpenSourceRepo;
