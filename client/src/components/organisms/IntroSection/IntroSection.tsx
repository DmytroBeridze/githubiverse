import { PrimaryButton } from "../../atoms/PrimaryButton";
import { ContentContainer } from "../ContentContainer";
import styles from "./IntroSection.module.scss";

export const IntroSection = () => {
  // -------------------------------

  const testFetch = async () => {
    await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-type": "appLication/json" },

      body: JSON.stringify({
        userName: "Front",
        passWord: 1234,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e.message));
  };
  // -------------------------------
  // -------------------------------

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
            <PrimaryButton onClick={() => testFetch()} className={styles.start}>
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
