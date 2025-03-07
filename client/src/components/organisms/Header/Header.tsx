import styles from "./Header.module.scss";
import { ContentContainer } from "../ContentContainer";
import { HeaderPhraseList } from "../../atoms/HeaderPhraseList";
import { Navbar } from "../Navbar";
import { useEffect, useState } from "react";
import { resize, scrollUtils } from "../../../utils/scrollUtils";

export const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const toggleBurger = () => {
    setIsBurgerOpen((prevState) => {
      const newState = !prevState;
      scrollUtils(newState);
      return newState;
    });
  };

  useEffect(() => {
    const handleResize = () => resize(setIsBurgerOpen, scrollUtils);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.header}>
      <ContentContainer>
        <h1>GitHubiverse</h1>
        <HeaderPhraseList />
        <Navbar isBurgerOpen={isBurgerOpen} toggleBurger={toggleBurger} />
      </ContentContainer>
    </div>
  );
};
