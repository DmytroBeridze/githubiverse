import styles from "./AuthorSearch.module.scss";

import { Issues } from "../../../types/issueTypes";
import { UserWithRepo } from "../../../types/userTypes";
import SearchPanel from "../../molecules/SearchPanel/SearchPanel";
import UserCard from "../../molecules/UserCard/UserCard";

interface AuthorSearchProps {
  onSubmit: (name: string) => void;
  validationError: { [key: string]: string | null };
  userError: string | null;
  loading: boolean;
  author: UserWithRepo | null;
  issue: Issues[];
  pullReq: Issues[];
}

const AuthorSearch = ({
  onSubmit,
  validationError,
  userError,
  loading,
  author,
  pullReq,
  issue,
}: AuthorSearchProps) => {
  return (
    <div>
      <SearchPanel
        onSubmit={onSubmit}
        validationError={validationError}
        userError={userError}
        loading={loading}
      />
      <UserCard author={author} pullReq={pullReq} issue={issue} />
    </div>
  );
};

export default AuthorSearch;
