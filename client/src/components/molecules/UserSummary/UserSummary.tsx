import styles from "./UserSummary.module.scss";
import { FC } from "react";
import Text from "../../atoms/Text/Text";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import { UserWithRepo } from "../../../types/userTypes";

interface UserSummaryProps {
  author: UserWithRepo;
}

const UserSummary: FC<UserSummaryProps> = ({ author }) => {
  const { avatar, login, email, location } = author;
  return (
    <div className={styles.userSummary}>
      <div className={styles.avatarContainer}>
        <UserAvatar link={avatar} alt={login} className={styles.avatar} />
      </div>

      {/* contact me */}
      <div className={styles.nickname}>
        <Text as="span">nickname:</Text>

        <Text as="span">{login}</Text>
      </div>
      <Text as="h3" className={styles.contact}>
        Contact me
      </Text>
      <div className={styles.mailContainer}>
        <Text as="span">email:</Text>
        <Text as="span">{email || "--"}</Text>
      </div>
      <div className={styles.locationContainer}>
        <Text as="span">location:</Text>
        <Text as="span">{location || "--"}</Text>
      </div>
    </div>
  );
};

export default UserSummary;
