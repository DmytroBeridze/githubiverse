import { useContext } from "react";
import { AuthStatus } from "../../molecules/AuthStatus";
import styles from "./HeaderPhraseList.module.scss";
import { PopupContext } from "../../../context/PopupContext";

export const HeaderPhraseList = () => {
  const headerPhrase = ["discover", "explore", "conquer", "dive in"];
  const burgerContext = useContext(PopupContext);

  const today = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!burgerContext) {
  }

  return (
    <div className={styles.headerPhraseList}>
      <ul>
        {headerPhrase.slice(0, 3).map((elem, index, arr) => (
          <li key={elem}>
            {elem.charAt(0).toUpperCase() + elem.slice(1)}
            {index < arr.length - 1 && "."}
          </li>
        ))}
      </ul>
      <span>
        {headerPhrase[headerPhrase.length - 1].charAt(0).toUpperCase() +
          headerPhrase[headerPhrase.length - 1].slice(1)}
      </span>
      <span>{formatter.format(today)}</span>
      <AuthStatus />
    </div>
  );
};
