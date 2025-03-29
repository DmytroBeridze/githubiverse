import { FC } from "react";
import { ExtendedRepoType } from "../../../types/repoTypes";
import styles from "./SearchRepositoriesList.module.scss";
import SearchRepositoryCard from "../SearchRepositoryCard/SearchRepositoryCard";

interface SearchRepositoriesListProps {
  error: string | null;
  loading: boolean;
  repo: ExtendedRepoType[] | null;
}

const SearchRepositoriesList: FC<SearchRepositoriesListProps> = ({
  error,
  loading,
  repo,
}) => {
  return (
    <div className={styles.repositoriesList}>
      {repo?.map((elem) => {
        return <SearchRepositoryCard key={elem.id} data={elem} />;
      })}
    </div>
  );
};

export default SearchRepositoriesList;
