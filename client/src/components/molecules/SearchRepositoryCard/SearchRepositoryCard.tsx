import styles from "./SearchRepositoryCard.module.scss";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import { ExtendedRepoType } from "../../../types/repoTypes";
import { FC, useEffect } from "react";
import Text from "../../atoms/Text/Text";
import { useNavigate } from "react-router";
import useIssueService from "../../../servises/useIssueService";

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
        <Text as="h4" variant="subtitle">
          {name}
        </Text>
        <Text as="span" variant="body">
          {createdAt}
        </Text>
        <Text as="p" variant="body">
          {description}
        </Text>
        <div className={styles.language}>
          <Text as="span" variant="body">
            language:
          </Text>
          <Text as="span" variant="body">
            {language || "--"}
          </Text>
        </div>
        <div className={styles.watchers}>
          <Text as="span" variant="body">
            watchers:
          </Text>
          <Text as="span" variant="body">
            {watchers}
          </Text>
        </div>
        <a href={htmlUrl}>
          <Text as="p" variant="subtitle">
            GitHub
          </Text>
        </a>
        {repoIssues.length > 0 ? (
          <div onClick={redirect}>
            <Text as="p" variant="subtitle">
              Watch Issues
            </Text>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchRepositoryCard;
