import { useEffect, useState } from "react";
import useIssueService from "../../../servises/useIssueService";
import styles from "./IssuesPage.module.scss";
import { useLocation } from "react-router";
import { Issues } from "../../../types/issueTypes";
import Accordion from "../../../components/organisms/Accordion/Accordion";
import { ContentContainer } from "../../../components/organisms/ContentContainer";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import { PrimaryButton } from "../../../components/atoms/PrimaryButton";

const IssuesPage = () => {
  const location = useLocation();
  const issues = location.state.repoIssues;
  const [filteredIssues, setFilteredIssues] = useState<Issues[]>(issues);

  const updateFilteredIssues = (key: string) => {
    const res =
      key === "all"
        ? issues
        : issues.filter((elem: Issues) => elem.state === key);
    setFilteredIssues(res);
  };

  useScrollToTop();
  return (
    <div className={styles.issuesPage}>
      <ContentContainer>
        <div className={styles.buttonsWrapper}>
          <PrimaryButton
            className={styles.button}
            onClick={() => updateFilteredIssues("all")}
          >
            all
          </PrimaryButton>
          <PrimaryButton
            className={styles.button}
            onClick={() => updateFilteredIssues("open")}
          >
            open
          </PrimaryButton>
          <PrimaryButton
            className={styles.button}
            onClick={() => updateFilteredIssues("closed")}
          >
            closed
          </PrimaryButton>
        </div>

        <Accordion issues={filteredIssues} slice={20} />
      </ContentContainer>
    </div>
  );
};

export default IssuesPage;
