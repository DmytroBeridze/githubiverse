import styles from "./DecorationPannel.module.scss";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Decor from "../../atoms/Decor/Decor";
import { ContentContainer } from "../../organisms/ContentContainer";

export const DecorationPannel = () => {
  const decorElements = [
    "fourCircle",
    "fourTriangles",
    "twoTriangles",
    "fourCircle",
    "twoTriangles",
    "bigCircle",
    "twoTriangles",
    "fourCircle",
    "twoTriangles",
    "twoRectangles",
  ] as const;

  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("DecorationPannel must be used within a ThemeProvider");

  const { theme } = themeContext;
  return (
    <div className={styles.decorationPannelContainer}>
      <ContentContainer>
        <ul className={styles.decorationPannel}>
          {decorElements.map((elem, i) => (
            <li key={i}>
              <Decor
                name={elem}
                className={styles.decorationElements}
                isDarkTheme={theme}
              />
            </li>
          ))}
        </ul>
      </ContentContainer>
    </div>
  );
};
