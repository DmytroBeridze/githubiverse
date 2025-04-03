import { Issues } from "../../../types/issueTypes";
import { UserWithRepo } from "../../../types/userTypes";
import SearchPanel from "../../molecules/SearchPanel/SearchPanel";
import UserCard from "../../molecules/UserCard/UserCard";
import RepositoriesList from "../../molecules/RepositoriesList/RepositoriesList";
import { RepoType } from "../../../types/repoTypes";
import Preloader from "../../atoms/Preloader/Preloader";
import Error from "../../atoms/Error/Error";

interface AuthorSearchProps {
  onSubmit: (name: string) => void;
  validationError: { [key: string]: string | null };
  userError: string | null;
  loading: boolean;
  author: UserWithRepo | null;
  issue: Issues[];
  pullReq: Issues[];
  repos: RepoType[];
  repoError: string | null;
  repoLoading: boolean;
}

const AuthorSearch = ({
  onSubmit,
  validationError,
  userError,
  loading,
  author,
  pullReq,
  issue,
  repos,
  repoError,
  repoLoading,
}: AuthorSearchProps) => {
  return (
    <div>
      <SearchPanel
        onSubmit={onSubmit}
        validationError={validationError}
        error={userError}
        loading={loading}
        placeholder="Author name..."
      />
      <UserCard author={author} pullReq={pullReq} issue={issue} />

      {repoLoading && <Preloader />}
      {repoError && <Error child={"Error loading repositories"} />}
      {!repoError && !repoLoading && repos.length > 0 && (
        <RepositoriesList author={author} repos={repos} />
      )}
    </div>
  );
};

export default AuthorSearch;
