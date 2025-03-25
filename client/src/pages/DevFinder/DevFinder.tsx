import styles from "./DevFinder.module.scss";
import { useEffect, useState } from "react";
import { ContentContainer } from "../../components/organisms/ContentContainer";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import useIssueService from "../../servises/useIssueService";
import useRepositoriesService from "../../servises/useRepositoriesService";
import useUserSearch from "../../servises/useUserSearch";
import { validationAuthor } from "../../utils/validationUtils";
import AuthorSearch from "../../components/organisms/AuthorSearch/AuthorSearch";

export const DevFinder = () => {
  // const { loading, status, clearError } = useSearchService();

  const { author, loading, userError, setUserError, getUserByName } =
    useUserSearch();
  const { issue, issuesQuantity, pullReq, pullRequest } = useIssueService();
  const {
    getRepositories,
    repos,
    repoError,
    loading: repoLoading,
  } = useRepositoriesService();
  const [validationError, setvalidationError] = useState<{
    [key: string]: string | null;
  }>({ name: null });
  console.log(repoError);

  useScrollToTop();

  const validation = async (name: string) => {
    const { isValid, error } = await validationAuthor(name);
    if (!isValid) {
      setvalidationError(error);
    } else setvalidationError({ name: null });

    return isValid;
  };

  const onSubmit = async (name: string) => {
    setUserError(null);
    const isVal = await validation(name);

    if (isVal) {
      const res = await getUserByName(name);
      if (!res) return;

      await Promise.all([
        getRepositories(name),
        pullRequest(name),
        issuesQuantity(name),
      ]);
    }
  };

  return (
    <div className={styles.devFinder}>
      <ContentContainer>
        <AuthorSearch
          author={author}
          issue={issue}
          loading={loading}
          onSubmit={onSubmit}
          pullReq={pullReq}
          userError={userError}
          validationError={validationError}
          repos={repos}
          repoError={repoError}
          repoLoading={repoLoading}
        />
      </ContentContainer>
    </div>
  );
};
