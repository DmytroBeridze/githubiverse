import styles from "./UserSummary.module.scss";
import { FC } from "react";
import Text from "../../atoms/Text/Text";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import { UserWithRepo } from "../../../types/userTypes";
import Icon from "../../atoms/Icon/Icon";
import { PrimaryButton } from "../../atoms/PrimaryButton";

interface UserSummaryProps {
  author: UserWithRepo;
}

const UserSummary: FC<UserSummaryProps> = ({ author }) => {
  const { avatar, login, email, location, github } = author;
  return (
    <div className={styles.userSummary}>
      <div className={styles.avatarContainer}>
        <UserAvatar link={avatar} alt={login} className={styles.avatar} />
      </div>

      <ul>
        <li className={styles.nickname}>
          <span className={styles.iconWrapper}>
            <Icon name="user" size="16" />
          </span>
          <Text as="span">{login}</Text>
        </li>

        <li>
          <Text as="h3" variant="body" className={styles.contact}>
            Contact me:
          </Text>
        </li>

        <li className={styles.mailContainer}>
          <span className={styles.iconWrapper}>
            <Icon name="mail" />
          </span>
          <Text as="span">{email || "--"}</Text>
        </li>

        <li className={styles.locationContainer}>
          <span className={styles.iconWrapper}>
            <Icon name="location" />
          </span>
          <Text as="span" variant="body">
            {location || "--"}
          </Text>
        </li>
      </ul>
    </div>
  );
};

export default UserSummary;
