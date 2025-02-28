import styles from "./BurgerMenuToggle.module.scss";
import Icon from "../../atoms/Icon/Icon";
import { FC } from "react";
import { NavbarProps } from "../../organisms/Navbar";

interface BurgerMenuToggleProps extends NavbarProps {
  className?: string;
  color?: string;
}

export const BurgerMenuToggle: FC<BurgerMenuToggleProps> = ({
  toggleBurger,
  isBurgerOpen,
  className,
  color,
}) => {
  return (
    <div
      className={`${styles.burgerMenuToggle} ${
        isBurgerOpen ? styles.active : ""
      } ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        toggleBurger();
      }}
    >
      <Icon name="burger" size="20" color={color} />
      <Icon name="close" size="20" color={color} />
    </div>
  );
};
