import { Issues } from "../../../types/issueTypes";
import { UserWithRepo } from "../../../types/userTypes";
import Chart from "../../atoms/Chart/Chart";
import Text from "../../atoms/Text/Text";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import UserDetails from "../UserDetails/UserDetails";
import UserSummary from "../UserSummary/UserSummary";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  author: UserWithRepo | null;
  pullReq: Issues[];
  issue: Issues[];
}

const UserCard = ({ author, pullReq, issue }: UserCardProps) => {
  if (!author) return null;

  return (
    <div className={styles.userCard}>
      <UserSummary author={author} />
      <UserDetails author={author} issue={issue} pullReq={pullReq} />
    </div>
  );
};

export default UserCard;
