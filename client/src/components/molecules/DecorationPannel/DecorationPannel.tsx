import styles from "./DecorationPannel.module.scss";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Decor from "../../atoms/Decor/Decor";
import { ContentContainer } from "../../organisms/ContentContainer";

type DecorName =
  | "bigCircle"
  | "fourTriangles"
  | "twoRectangles"
  | "twoTriangles"
  | "fourCircle"
  | "quadrant"
  | "fourCircleFooter"
  | "semicircles";

interface DecorationPannelProps {
  decorElements: readonly DecorName[];
  // decorElements: string[];
  type?: string;
}

export const DecorationPannel = ({
  decorElements,
  type = "header",
}: DecorationPannelProps) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("DecorationPannel must be used within a ThemeProvider");

  const { theme } = themeContext;
  return (
    <div className={` ${styles.decorationPannelContainer} ${styles[type]}`}>
      {/* <div className={` ${styles.decorationPannelContainer}`}> */}
      <ContentContainer>
        <ul className={styles.decorationPannel}>
          {/* <ul className={` ${styles[type]}`}> */}
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
