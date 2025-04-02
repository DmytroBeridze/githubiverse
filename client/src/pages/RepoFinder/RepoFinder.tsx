import styles from "./RepoFinder.module.scss";

import { useEffect, useState } from "react";
import { ContentContainer } from "../../components/organisms/ContentContainer";
import RepoSearch from "../../components/organisms/RepoSearch/RepoSearch";
import { useRepoByName } from "../../servises/useRepoByName";
import { validationName } from "../../utils/validationUtils";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import sessionStorageUtils from "../../utils/sessionStorageUtils";
import { ExtendedRepoType } from "../../types/repoTypes";
import useRepositoriesService from "../../servises/useRepositoriesService";
import usePopularRepo from "../../servises/usePopularRepos";
import Slider from "../../components/organisms/Slider/Slider";
import UserSlide from "../../components/molecules/UserSlide/UserSlide";
import Preloader from "../../components/atoms/Preloader/Preloader";
import RepoSlide from "../../components/molecules/RepoSlide/RepoSlide";
import Error from "../../components/atoms/Error/Error";

export const RepoFinder = () => {
  const {
    clearError,
    clearMessage,
    error,
    getRepoByName,
    loading,
    message,
    repo,
    repoError,
    setRepoError,
  } = useRepoByName();

  const {
    getPopularRepos,
    popularRepos,
    popularReposError,
    setPopularReposRepoError,
  } = usePopularRepo();

  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState<ExtendedRepoType[]>([]);

  const [validationError, setValidationError] = useState<{
    [key: string]: string | null;
  }>({ name: null });

  const validation = async (name: string) => {
    const { isValid, error } = await validationName(name);
    if (!isValid) {
      setValidationError(error);
    } else setValidationError({ name: null });
    return isValid;
  };

  const onSubmit = async (name: string) => {
    setLocalLoading(true);
    setRepoError(null);
    const valid = await validation(name);
    if (valid) {
      getRepoByName(name);
    }
  };

  useEffect(() => {
    const data = sessionStorageUtils.getData("repositories");
    if (Array.isArray(data)) {
      setRepos(data);
    } else setRepos([]);
  }, []);

  useEffect(() => {
    if (repo) {
      sessionStorageUtils.setData("repositories", repo);
      setRepos(repo);
      setLocalLoading(false);
    }
  }, [repo]);

  useEffect(() => {
    setPopularReposRepoError(null);
    getPopularRepos();
  }, []);

  useScrollToTop();

  return (
    <div className={styles.repoFinder}>
      <ContentContainer>
        <div className={styles.repoFinderWrapper}>
          <RepoSearch
            validationError={validationError}
            onSubmit={onSubmit}
            error={repoError}
            loading={loading || localLoading}
            repo={repos}
          />
        </div>
        {popularReposError && <Error child={popularReposError}></Error>}
        {popularRepos.length >= 2 ? (
          <Slider
            data={popularRepos}
            renderItem={(repo) => <RepoSlide repo={repo} />}
            // renderItem={(author) => <UserSlide user={author} />}
            perView={{ small: 1, medium: 2, large: 3 }}
            className={styles.slider}
          />
        ) : (
          <Preloader />
        )}
      </ContentContainer>
    </div>
  );
};
