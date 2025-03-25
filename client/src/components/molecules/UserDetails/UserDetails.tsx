import styles from "./UserDetails.module.scss";
import { UserWithRepo } from "../../../types/userTypes";
import Text from "../../atoms/Text/Text";
import { FC } from "react";
import Charts from "../Charts/Charts";
import { Issues } from "../../../types/issueTypes";
import { dateFormatter } from "../../../utils/dateFormatter";
import { PrimaryButton } from "../../atoms/PrimaryButton";

interface UserDetails {
  author: UserWithRepo;
  issue: Issues[];
  pullReq: Issues[];
}

const UserDetails: FC<UserDetails> = ({ author, issue, pullReq }) => {
  const { name, createdAt, bio, company, followers, following, publicRepos } =
    author;

  const formattedDate = dateFormatter(createdAt, "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <div className={styles.UserDetails}>
      <Text as="h3" variant="subtitle" className={styles.name}>
        {name}
      </Text>
      <div>
        <ul>
          <li className={styles.created}>
            <Text as="span" variant="litle" className={styles.label}>
              createdAt:
            </Text>
            <Text as="span" variant="body" className={styles.data}>
              {formattedDate}
            </Text>
          </li>
          {bio && (
            <li>
              <Text as="span" variant="litle" className={styles.label}>
                bio:
              </Text>
              <Text as="span" variant="body" className={styles.data}>
                {bio}
              </Text>
            </li>
          )}
          {company && (
            <li className={styles.company}>
              <Text as="span" variant="litle" className={styles.label}>
                company:
              </Text>
              <Text as="span" variant="body" className={styles.data}>
                {company}
              </Text>
            </li>
          )}
          <li className={styles.publicRepos}>
            <Text as="span" variant="litle" className={styles.label}>
              repositories:
            </Text>
            <Text as="span" variant="body" className={styles.data}>
              {publicRepos}
            </Text>
          </li>
          <li className={styles.followers}>
            <Text as="span" variant="litle" className={styles.label}>
              followers:
            </Text>
            <Text as="span" variant="body" className={styles.data}>
              {followers}
            </Text>
          </li>
          <li className={styles.following}>
            <Text as="span" variant="litle" className={styles.label}>
              following:
            </Text>
            <Text as="span" variant="body" className={styles.data}>
              {following}
            </Text>
          </li>
        </ul>
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
