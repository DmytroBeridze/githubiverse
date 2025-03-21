import styles from "./DevFinder.module.scss";
import { useEffect, useState } from "react";
import { ContentContainer } from "../../organisms/ContentContainer";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import useSearchService from "../../../servises/useSearchService";
import useIssueService from "../../../servises/useIssueService";
import useRepositoriesService from "../../../servises/useRepositoriesService";
import useUserSearch from "../../../servises/useUserSearch";
import SearchPanel from "../../molecules/SearchPanel/SearchPanel";
import { validationAuthor } from "../../../utils/validationUtils";
import { boolean, string } from "yup";
import { useApi } from "../../../hooks/useApi";
import UserCard from "../../molecules/UserCard/UserCard";

export const DevFinder = () => {
  // const { loading, status, clearError } = useSearchService();

  const { author, loading, userError, setUserError, getUserByName } =
    useUserSearch();
  const {
    issue,
    issuesQuantity,
    pullReq,
    pullRequest,
    issueError,
    pullRequestsError,
  } = useIssueService();
  const { getRepositories, repos, repoError } = useRepositoriesService();
  const [validationError, setvalidationError] = useState<{
    [key: string]: string | null;
  }>({ name: null });

  useScrollToTop();

  const validation = async (name: string) => {
    const { isValid, error } = await validationAuthor(name);
    if (!isValid) {
      setvalidationError(error);
    } else setvalidationError({ name: null });

    return isValid;
  };

  console.log("render");

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
    // issuesQuantity("karpathy");
  };

  return (
    <div className={styles.devFinder}>
      <ContentContainer>
        <SearchPanel
          onSubmit={onSubmit}
          validationError={validationError}
          userError={userError}
          loading={loading}
        />
        <UserCard author={author} />
      </ContentContainer>
    </div>
  );
};
