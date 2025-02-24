import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { BurgerMenuToggle } from "../../molecules/BurgerMenuToggle";
import { ThemeSwitcher } from "../../molecules/ThemeSwitcher";
import { FC } from "react";

export interface NavbarProps {
  isBurgerOpen: boolean;
  toggleBurger: () => void;
}

export const Navbar: FC<NavbarProps> = ({ isBurgerOpen, toggleBurger }) => {
  const links = ["home", "devFinder", "repoFinder", "issueFinder"];

  return (
    <nav className={styles.navbar}>
      <ul>
        {links.map((elem, i) => (
          <li key={i}>
            <NavLink
              to={`${elem === "home" ? "/" : `/${elem}`}`}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {elem.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
      <BurgerMenuToggle
        toggleBurger={toggleBurger}
        isBurgerOpen={isBurgerOpen}
      />
      <ThemeSwitcher />
    </nav>
  );
};
