import { UserWithRepo } from "../../../types/userTypes";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  author: UserWithRepo | null;
}

const UserCard = ({ author }: UserCardProps) => {
  if (!author) return null;
  const { avatar, login } = author;
  return (
    <div className={styles.userCard}>
      {/* <div className={styles.decor}></div> */}

      <div className={styles.userSummary}>
        <UserAvatar link={avatar} alt={login} className={styles.avatar} />
      </div>
      <div className={styles.UserDetails}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum quo ullam
        odio nostrum dolorum perferendis esse doloremque fuga odit. Molestias
        cupiditate nostrum modi nam itaque atque blanditiis tempora
        reprehenderit. Rerum.
      </div>
    </div>
  );
};

export default UserCard;
