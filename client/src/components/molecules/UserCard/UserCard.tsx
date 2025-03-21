import { UserWithRepo } from "../../../types/userTypes";
import Text from "../../atoms/Text/Text";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  author: UserWithRepo | null;
}

const UserCard = ({ author }: UserCardProps) => {
  if (!author) return null;
  const {
    avatar,
    login,
    name,
    email,
    location,
    createdAt,
    bio,
    company,
    followers,
    following,
    publicRepos,
    github,
  } = author;
  console.log();

  return (
    <div className={styles.userCard}>
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
      {/* user details */}
      <div className={styles.UserDetails}>
        <Text as="h3">{name}</Text>

        <div className={styles.created}>
          <Text as="span">createdAt:</Text>

          <Text as="span">{createdAt}</Text>
        </div>
        {bio && (
          <Text as="p" className={styles.bio}>
            {bio}
          </Text>
        )}
        {company && (
          <div className={styles.company}>
            <Text as="span">company:</Text>
            <Text as="span">{company}</Text>
          </div>
        )}
        <div className={styles.followers}>
          <Text as="span">followers:</Text>
          <Text as="span">{followers}</Text>
        </div>
        <div className={styles.following}>
          <Text as="span">following:</Text>
          <Text as="span">{following}</Text>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
