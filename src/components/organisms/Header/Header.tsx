import styles from "./Header.module.scss";
import { ContentContainer } from "../ContentContainer";
import { ThemeSwitcher } from "../../molecules/ThemeSwitcher";

export const Header = () => {
  return (
    <div className={styles.header}>
      <ContentContainer>
        <h1>GitHubiverse</h1>
        <ThemeSwitcher />
      </ContentContainer>
    </div>
  );
};
