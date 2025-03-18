import { Link } from "react-router-dom";
import styles from "./FooterNavigation.module.scss";
import Text from "../../atoms/Text/Text";

const FooterNavigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link to={"/"}>
        <Text as="p">Home</Text>
      </Link>
      <Link to={"/devFinder"}>
        <Text as="p">DevFinder</Text>
      </Link>
      <Link to={"/repoFinder"}>
        <Text as="p">RepoFinder</Text>
      </Link>
      <Link to={"/issueFinder"}>
        <Text as="p">IssueFinder</Text>
      </Link>
    </nav>
  );
};

export default FooterNavigation;
