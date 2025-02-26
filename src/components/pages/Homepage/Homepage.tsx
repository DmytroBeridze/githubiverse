import styles from "./Homepage.module.scss";

import { ContentContainer } from "../../organisms/ContentContainer";
import { QuizInfo } from "../../molecules/QuizInfo";
import { IntroSection } from "../../organisms/IntroSection";

export const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <QuizInfo />
      <IntroSection />
    </div>
  );
};
