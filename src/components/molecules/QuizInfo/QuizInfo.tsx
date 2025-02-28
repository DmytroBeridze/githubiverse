import { ContentContainer } from "../../organisms/ContentContainer";
import styles from "./QuizInfo.module.scss";

export const QuizInfo = () => {
  return (
    <div className={styles.quizInfo}>
      <ContentContainer>
        <h2>Queries from the Quizzical</h2>
        <ul>
          <li>
            <h4>Can I search for repositories?</h4>
            <p>
              Yes, oh curious coder! Delve into the boundless realm of GitHub
              repositories at your leisure.
            </p>
          </li>
          <li>
            <h4>How do I find top authors?</h4>
            <p>
              Just unleash your curiosity and start searching! The best way to
              learn is to explore.
            </p>
          </li>
        </ul>
      </ContentContainer>
    </div>
  );
};
