import styles from "./Homepage.module.scss";

import { QuizInfo } from "../../components/molecules/QuizInfo";
import { IntroSection } from "../../components/organisms/IntroSection";
import { useContext } from "react";
import { PopupContext } from "../../context/PopupContext";
import { FormTypeContext } from "../../context/FormTypeContext";
import LatestIssues from "../../components/organisms/LatestIssues/LatestIssues";
import RandomAuthors from "../../components/organisms/RandomAuthors/RandomAuthors";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const Homepage = () => {
  const popupContext = useContext(PopupContext);
  const formTypeContext = useContext(FormTypeContext);
  useScrollToTop();

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

      <LatestIssues />
      <RandomAuthors />
    </div>
  );
};
