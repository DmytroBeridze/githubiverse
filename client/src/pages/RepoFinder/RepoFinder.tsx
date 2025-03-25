import { ContentContainer } from "../../components/organisms/ContentContainer";
import RepoSearch from "../../components/organisms/RepoSearch/RepoSearch";
import styles from "./RepoFinder.module.scss";

export const RepoFinder = () => {
  return (
    <div className={styles.repoFinder}>
      <ContentContainer>
        <div className={styles.repoFinderWrapper}>
          <RepoSearch />
        </div>
      </ContentContainer>
    </div>
  );
};
