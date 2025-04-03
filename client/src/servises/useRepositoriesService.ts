import { useState } from "react";
import { GitRepoType, RepoType } from "../types/repoTypes";
import { useApi } from "../hooks/useApi";
import { transformRepo } from "../utils/dataTransformers";

const useRepositoriesService = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [repoError, setRepoError] = useState<string | null>(null);

  const { sendRequest, loading } = useApi();

  // -----------------------------------get repositories
  const getRepositories = async (user: string) => {
    let page = 1;
    let allRepositories: RepoType[] = [];
    setRepos([]);
    setRepoError(null);

    try {
      while (true) {
        const repoUrl = `https://api.github.com/users/${user}/repos?per_page=10&page=${page}`;

        // !------------видалити Authorization: `token ${token}`
        const repositories = await sendRequest(repoUrl);

        if (!repositories || repositories.length === 0) break;

        const transformRepositories = Array.isArray(repositories)
          ? repositories.map((elem: GitRepoType) => transformRepo(elem))
          : [];
        allRepositories.push(...transformRepositories);
        if (repositories.length < 10) break;

        page++;
        if (page > 2) break;
      }
    } catch (error) {
      setRepoError("Error loading repositories");
    }
    setRepos(allRepositories);
  };

  return { repos, getRepositories, repoError, loading };
};

export default useRepositoriesService;
