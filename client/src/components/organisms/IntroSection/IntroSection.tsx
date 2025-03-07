import { PrimaryButton } from "../../atoms/PrimaryButton";
import { ContentContainer } from "../ContentContainer";
import styles from "./IntroSection.module.scss";
import { FC } from "react";
import { RegistrationPopupProps } from "../RegistrationPopup";
import localStorageUtils from "../../../utils/localStorageUtils";
import { useNavigate } from "react-router";

interface IntroSectionProps extends Omit<RegistrationPopupProps, "formType"> {
  setFormType: React.Dispatch<React.SetStateAction<"" | "signup" | "login">>;
}

export const IntroSection: FC<IntroSectionProps> = ({
  burgerHandler,
  isOpenBurger,
  setFormType,
}) => {
  const navigate = useNavigate();
  const checkAuthAndRedirect = () => {
    const token = localStorageUtils.getData("token");
    if (token) {
      navigate("/devFinder");
    } else {
      burgerHandler();
    }
    setFormType("signup");
  };

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
              onClick={checkAuthAndRedirect}
              className={styles.start}
            >
              Start Exploration
            </PrimaryButton>
            <PrimaryButton
              onClick={() => {
                burgerHandler();
                setFormType("login");
              }}
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
