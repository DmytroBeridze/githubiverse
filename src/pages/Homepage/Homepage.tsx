import styles from "./Homepage.module.scss";

import { ContentContainer } from "../../components/ContentContainer";

export const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <ContentContainer>GitHubiverse</ContentContainer>
    </div>
  );
};
