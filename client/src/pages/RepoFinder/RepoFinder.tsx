import { useEffect, useState } from "react";
import { ContentContainer } from "../../components/organisms/ContentContainer";
import RepoSearch from "../../components/organisms/RepoSearch/RepoSearch";
import styles from "./RepoFinder.module.scss";
import { useRepoByName } from "../../servises/useRepoByName";
import { validationName } from "../../utils/validationUtils";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { Outlet } from "react-router-dom";

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
    setRepoError(null);
    const valid = await validation(name);
    if (valid) {
      getRepoByName(name);
    }
  };
  useScrollToTop();

  return (
    <div className={styles.repoFinder}>
      <ContentContainer>
        <div className={styles.repoFinderWrapper}>
          <RepoSearch
            validationError={validationError}
            onSubmit={onSubmit}
            error={repoError}
            loading={loading}
            repo={repo}
          />
          <Outlet />
        </div>
      </ContentContainer>
    </div>
  );
};
