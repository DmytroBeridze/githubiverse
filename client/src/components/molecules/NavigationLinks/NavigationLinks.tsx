import { NavLink } from "react-router-dom";
import { links } from "../../atoms/constants";
import styles from "./NavigationLinks.module.scss";
import { FC } from "react";

interface NavigationLinksProps {
  onClick?: () => void;
}

export const NavigationLinks: FC<NavigationLinksProps> = ({ onClick }) => {
  return (
    <ul className={styles.navigationLinks} onClick={onClick}>
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
  );
};
