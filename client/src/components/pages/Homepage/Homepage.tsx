import styles from "./Homepage.module.scss";

import { QuizInfo } from "../../molecules/QuizInfo";
import { IntroSection } from "../../organisms/IntroSection";
import { RegistrationPopup } from "../../organisms/RegistrationPopup";
import { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../../context/PopupContext";
import { FormTypeContext } from "../../../context/FormTypeContext";
import useSearchService from "../../../servises/useSearchService";

export const Homepage = () => {
  const popupContext = useContext(PopupContext);
  const formTypeContext = useContext(FormTypeContext);
  const { getRandomIssues } = useSearchService();

  useEffect(() => {
    getRandomIssues();
  }, []);

  if (!popupContext || !formTypeContext) {
    console.error(
      "ThemeContext is undefined. Make sure to wrap your app in ThemeProvider."
    );
    return null;
  }
  const { popupHandler, isOpenPopup } = popupContext;
  const { setFormType } = formTypeContext;

  return (
    <div className={styles.homepage}>
      <QuizInfo />
      <IntroSection
        popupHandler={popupHandler}
        isOpenBurger={isOpenPopup}
        setFormType={setFormType}
      />
    </div>
  );
};
