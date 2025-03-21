import styles from "./UserDetails.module.scss";
import { UserWithRepo } from "../../../types/userTypes";
import Text from "../../atoms/Text/Text";
import { FC } from "react";
import Charts from "../Charts/Charts";
import { Issues } from "../../../types/issueTypes";

interface UserDetails {
  author: UserWithRepo;
  issue: Issues[];
  pullReq: Issues[];
}

const UserDetails: FC<UserDetails> = ({ author, issue, pullReq }) => {
  const { name, createdAt, bio, company, followers, following, publicRepos } =
    author;

  return (
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

      {/* chart */}
      <Charts
        followers={followers}
        following={following}
        issue={issue}
        publicRepos={publicRepos}
        pullReq={pullReq}
      />
    </div>
  );
};

export default UserDetails;
