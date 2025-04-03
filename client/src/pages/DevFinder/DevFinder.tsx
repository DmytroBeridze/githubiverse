import styles from "./DevFinder.module.scss";
import { useContext, useState } from "react";
import { ContentContainer } from "../../components/organisms/ContentContainer";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import useIssueService from "../../servises/useIssueService";
import useRepositoriesService from "../../servises/useRepositoriesService";
import useUserSearch from "../../servises/useUserSearch";
import { validationName } from "../../utils/validationUtils";
import AuthorSearch from "../../components/organisms/AuthorSearch/AuthorSearch";
import { RandomAuthorsContext } from "../../context/RandomAuthorsContext";
import Slider from "../../components/organisms/Slider/Slider";
import UserSlide from "../../components/molecules/UserSlide/UserSlide";
import Preloader from "../../components/atoms/Preloader/Preloader";
import Error from "../../components/atoms/Error/Error";

export const DevFinder = () => {
  const {
    authors,
    randomIssuesError,
    loading: authorLoading,
  } = useContext(RandomAuthorsContext);

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

  useScrollToTop();

  const validation = async (name: string) => {
    const { isValid, error } = await validationName(name);
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

        {randomIssuesError && (
          <Error child={randomIssuesError} className={styles.errorContent} />
        )}

        {authors.length >= 2 ? (
          <Slider
            data={authors}
            renderItem={(author) => <UserSlide user={author} />}
            perView={{ medium: 2, large: 2 }}
            className={styles.slider}
          />
        ) : (
          <Preloader />
        )}
      </ContentContainer>
    </div>
  );
};
