import { PrimaryButton } from "../../atoms/PrimaryButton";
import { ContentContainer } from "../ContentContainer";
import styles from "./IntroSection.module.scss";

import { useAuthServise } from "../../../servises/useAuthServise";
import { useEffect } from "react";

export const IntroSection = () => {
  const { registerUser, loading, error, status, message, clearError } =
    useAuthServise();

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
            {/* {loading ? "...loading" : null} */}
            {error}
            {!error && message ? message : null}
            <PrimaryButton
              onClick={() => {
                registerUser();
                clearError();
              }}
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
