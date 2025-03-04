import styles from "./Homepage.module.scss";

import { QuizInfo } from "../../molecules/QuizInfo";
import { IntroSection } from "../../organisms/IntroSection";
import { RegistrationPopup } from "../../organisms/RegistrationPopup";
import { useState } from "react";
import { scrollUtils } from "../../../utils/scrollUtils";

export const Homepage = () => {
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);
  const [formType, setFormType] = useState<"signup" | "login" | "">("");

  const burgerHandler = () => {
    const newState = !isOpenBurger;
    setIsOpenBurger(newState);
    scrollUtils(newState);
  };

  return (
    <div className={styles.homepage}>
      <QuizInfo />
      <IntroSection
        burgerHandler={burgerHandler}
        isOpenBurger={isOpenBurger}
        setFormType={setFormType}
      />
      <RegistrationPopup
        isOpenBurger={isOpenBurger}
        burgerHandler={burgerHandler}
        formType={formType}
      />
    </div>
  );
};
