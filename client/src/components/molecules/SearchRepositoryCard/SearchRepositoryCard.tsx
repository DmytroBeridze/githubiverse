import styles from "./SearchRepositoryCard.module.scss";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import { ExtendedRepoType } from "../../../types/repoTypes";
import { FC, useEffect } from "react";
import Text from "../../atoms/Text/Text";
import { useNavigate } from "react-router";
import useIssueService from "../../../servises/useIssueService";
import { dateFormatter } from "../../../utils/dateFormatter";

interface SearchRepositoryCardProps {
  data: ExtendedRepoType;
}

const SearchRepositoryCard: FC<SearchRepositoryCardProps> = ({ data }) => {
  let navigate = useNavigate();
  const {
    ownerLogin,
    ownerAwatar,
    ownerGithub,
    name,
    createdAt,
    description,
    language,
    watchers,
    htmlUrl,
    issuesUrl,
  } = data;
  const allIssuesUrl = issuesUrl.replace(/{.*}/, "?state=all");

  const { issuesByRepo, repoIssues, repoIssuesError, error, loading } =
    useIssueService();
  const dateFormatted = dateFormatter(createdAt, "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    issuesByRepo(allIssuesUrl);
  }, []);

  const redirect = () => {
    navigate(`/issuesPage`, {
      state: { repoIssues: repoIssues },
    });
  };

  return (
    <div className={styles.searchRepositoryCard}>
      {/* user */}
      <div className={styles.userInfo}>
        <UserAvatar
          link={ownerAwatar}
          alt={ownerLogin}
          className={styles.avatar}
        />

        <a href={ownerGithub}>
          <Text as="h4" variant="body">
            {ownerLogin}
          </Text>
        </a>
      </div>

      {/* repo */}
      <div className={styles.repoInfo}>
        <Text as="h4" variant="subtitle" className={styles.name}>
          {name}
        </Text>
        <Text as="span" variant="litle">
          {dateFormatted}
        </Text>

        {description && (
          <Text as="p" variant="body">
            {description}
          </Text>
        )}

        <div className={styles.language}>
          <Text as="span" variant="litle" className={styles.label}>
            language:
          </Text>
          <Text as="span" variant="body">
            {language || "--"}
          </Text>
        </div>
        <div className={styles.watchers}>
          <Text as="span" variant="litle" className={styles.label}>
            watchers:
          </Text>
          <Text as="span" variant="body">
            {watchers}
          </Text>
        </div>
        <a href={htmlUrl}>
          <Text as="p" variant="body">
            GitHub
          </Text>
        </a>
        {repoIssues.length > 0 ? (
          <div onClick={redirect} className={styles.redirect}>
            <Text as="p" variant="body">
              Watch Issues
            </Text>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchRepositoryCard;
