import { Link } from "react-router-dom";
import styles from "./FooterNavigation.module.scss";

const FooterNavigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link to={"/"}>Home</Link>
      <Link to={"/devFinder"}>DevFinder</Link>
      <Link to={"/repoFinder"}>RepoFinder</Link>
      <Link to={"/issueFinder"}>IssueFinder</Link>
    </nav>
  );
};

export default FooterNavigation;
