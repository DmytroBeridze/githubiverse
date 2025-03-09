import { FC } from "react";
import Accordion from "../Accordion/Accordion";
import { ContentContainer } from "../ContentContainer";
import styles from "./LatestIssues.module.scss";
import { Issues } from "../../../types/issueTypes";

interface LatestIssuesProps {
  randomIssues: Issues[];
}

const LatestIssues: FC<LatestIssuesProps> = ({ randomIssues }) => {
  return (
    <div className={styles.latestIssuesContainer}>
      <ContentContainer>
        <h2>LatestIssues</h2>
        <Accordion randomIssues={randomIssues} />
      </ContentContainer>
    </div>
  );
};

export default LatestIssues;
