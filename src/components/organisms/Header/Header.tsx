import styles from "./Header.module.scss";
import { ContentContainer } from "../ContentContainer";
import { HeaderPhraseList } from "../../atoms/HeaderPhraseList";
import { Navbar } from "../Navbar";
import { useState } from "react";

export const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(true);

  const toggleBurger = () => {
    setIsBurgerOpen((prevState) => !prevState);
  };
  console.log(isBurgerOpen);
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
