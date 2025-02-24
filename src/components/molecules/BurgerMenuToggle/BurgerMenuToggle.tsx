import styles from "./BurgerMenuToggle.module.scss";
import Icon from "../../atoms/Icon/Icon";
import { FC } from "react";
import { NavbarProps } from "../../organisms/Navbar";

interface BurgerMenuToggleProps extends NavbarProps {}

export const BurgerMenuToggle: FC<BurgerMenuToggleProps> = ({
  toggleBurger,
  isBurgerOpen,
}) => {
  return (
    <div
      className={`${styles.burgerMenuToggle} ${
        isBurgerOpen ? styles.active : ""
      }`}
      onClick={toggleBurger}
    >
      <Icon name="burger" size="20" />
      <Icon name="close" size="20" />
    </div>
  );
};
