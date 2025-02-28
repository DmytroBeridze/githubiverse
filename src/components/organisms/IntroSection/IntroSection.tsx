import { PrimaryButton } from "../../atoms/PrimaryButton";
import { ContentContainer } from "../ContentContainer";
import styles from "./IntroSection.module.scss";

export const IntroSection = () => {
  return (
    <div className={styles.introSectionContainer}>
      <ContentContainer>
        <div className={styles.introSection}>
          <h2>Excited Yet?</h2>
          <p>
            May the force of the code be with you! Begin your journey in the
            GitHubiverse.
          </p>
          <div className={styles.buttonContainer}>
            <PrimaryButton
              onClick={() => console.log("Start Exploration")}
              className={styles.start}
            >
              Start Exploration
            </PrimaryButton>
            <PrimaryButton
              onClick={() => console.log("Sign Up")}
              className={styles.signUp}
            >
              Sign Up
            </PrimaryButton>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};
