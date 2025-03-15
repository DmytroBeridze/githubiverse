import { FC, useEffect } from "react";
import Accordion from "../Accordion/Accordion";
import { ContentContainer } from "../ContentContainer";
import styles from "./LatestIssues.module.scss";
import useSearchService from "../../../servises/useSearchService";
import Preloader from "../../atoms/Preloader/Preloader";
import Error from "../../atoms/Error/Error";

const LatestIssues = () => {
  const { error, clearError, loading, getRandomIssues, randomIssues } =
    useSearchService();

  useEffect(() => {
    clearError();
    getRandomIssues();
  }, []);

  return (
    <>
      {error && <Error child={error} className={styles.errorContent} />}
      {!loading && !error ? (
        <div className={styles.latestIssuesContainer}>
          <ContentContainer>
            <Accordion randomIssues={randomIssues} />
          </ContentContainer>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default LatestIssues;
