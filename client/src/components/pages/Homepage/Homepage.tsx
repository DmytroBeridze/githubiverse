import styles from "./Homepage.module.scss";

import { QuizInfo } from "../../molecules/QuizInfo";
import { IntroSection } from "../../organisms/IntroSection";
import { RegistrationPopup } from "../../organisms/RegistrationPopup";
import { useState } from "react";
import { scrollUtils } from "../../../utils/scrollUtils";

export const Homepage = () => {
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);
  const [isLoginBtn, setIsLoginBtn] = useState<string>("");

  const burgerHandler = () => {
    const newState = !isOpenBurger;
    setIsOpenBurger(newState);
    scrollUtils(newState);
  };

  return (
    <div className={styles.homepage}>
      <QuizInfo />
      <IntroSection burgerHandler={burgerHandler} isOpenBurger={isOpenBurger} />
      <RegistrationPopup
        isOpenBurger={isOpenBurger}
        burgerHandler={burgerHandler}
      />
    </div>
  );
};
