import { FC } from "react";
import { ExtendedRepoType } from "../../../types/repoTypes";
import styles from "./SearchRepositoriesList.module.scss";
import SearchRepositoryCard from "../SearchRepositoryCard/SearchRepositoryCard";
import Preloader from "../../atoms/Preloader/Preloader";
import Error from "../../atoms/Error/Error";

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
  if (error) return <Error child={error} />;
  if (loading) return <Preloader />;

  return (
    <div className={styles.repositoriesList}>
      {repo?.map((elem) => {
        return <SearchRepositoryCard key={elem.id} data={elem} />;
      })}
    </div>
  );
};

export default SearchRepositoriesList;
