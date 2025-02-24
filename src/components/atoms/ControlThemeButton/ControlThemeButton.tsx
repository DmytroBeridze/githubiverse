import styles from "./ControlThemeButton.module.scss";
import { FC } from "react";
import Icon from "../Icon/Icon";

interface ControlThemeButtonProps {
  theme: boolean;
  toggleTheme: () => void;
}

export const ControlThemeButton: FC<ControlThemeButtonProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <div onClick={toggleTheme} className={styles.button}>
      <span>{theme ? "light" : "dark"}</span>
      <span>
        {theme ? <Icon name="sun" size="20" /> : <Icon name="moon" size="20" />}
      </span>
    </div>
  );
};
