import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { BurgerMenuToggle } from "../../molecules/BurgerMenuToggle";
import { ThemeSwitcher } from "../../molecules/ThemeSwitcher";
import { FC } from "react";
import { BurgerMenu } from "../BurgerMenu";
import { links } from "../../atoms/constants";
import { NavigationLinks } from "../../molecules/NavigationLinks";

export interface NavbarProps {
  isBurgerOpen: boolean;
  toggleBurger: () => void;
}

export const Navbar: FC<NavbarProps> = ({ isBurgerOpen, toggleBurger }) => {
  return (
    <nav className={styles.navbar}>
      <NavigationLinks />
      <BurgerMenuToggle
        toggleBurger={toggleBurger}
        isBurgerOpen={isBurgerOpen}
      />
      <ThemeSwitcher />
      <BurgerMenu toggleBurger={toggleBurger} isBurgerOpen={isBurgerOpen} />
    </nav>
  );
};
