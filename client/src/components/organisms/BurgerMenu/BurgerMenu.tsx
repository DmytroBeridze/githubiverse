import styles from "./BurgerMenu.module.scss";
import { BurgerMenuToggle } from "../../molecules/BurgerMenuToggle";
import { NavbarProps } from "../Navbar";
import { FC } from "react";
import { NavigationLinks } from "../../molecules/NavigationLinks";

export interface BurgerMenuProps extends NavbarProps {}

export const BurgerMenu: FC<BurgerMenuProps> = ({
  toggleBurger,
  isBurgerOpen,
}) => {
  const closeMenu = () => {
    toggleBurger();
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles.menuContainer} ${isBurgerOpen ? styles.active : ""}`}
      onClick={closeMenu}
    >
      <BurgerMenuToggle
        toggleBurger={toggleBurger}
        isBurgerOpen={isBurgerOpen}
        className={styles.menuBurgerToggle}
        color="gray"
      />
      <nav className={styles.menu} onClick={handleMenuClick}>
        <NavigationLinks onClick={toggleBurger} />
      </nav>
    </div>
  );
};
