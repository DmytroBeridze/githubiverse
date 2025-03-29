import styles from "./RepoSearch.scss";
import SearchPanel from "../../molecules/SearchPanel/SearchPanel";
import { useRepoByName } from "../../../servises/useRepoByName";
import { FC, useEffect } from "react";
import SearchRepositoriesList from "../../molecules/SearchRepositoriesList/SearchRepositoriesList";
import { ExtendedRepoType } from "../../../types/repoTypes";

interface RepoSearchProps {
  validationError: { [key: string]: string | null };
  error: string | null;
  loading: boolean;
  repo: ExtendedRepoType[] | null;
  onSubmit: (name: string) => void;
}

const RepoSearch: FC<RepoSearchProps> = ({
  validationError,
  onSubmit,
  error,
  loading,
  repo,
}) => {
  return (
    <div>
      <SearchPanel
        error={error}
        loading={loading}
        validationError={validationError}
        onSubmit={onSubmit}
        placeholder="Repository name..."
      />

      {!error && !loading && repo && repo?.length > 0 ? (
        <SearchRepositoriesList repo={repo} loading={loading} error={error} />
      ) : null}
    </div>
  );
};

export default RepoSearch;
