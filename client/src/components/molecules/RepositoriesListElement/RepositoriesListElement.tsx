import styles from "./RepositoriesListElement.module.scss";
import { FC } from "react";
import { RepoType } from "../../../types/repoTypes";
import Text from "../../atoms/Text/Text";
import { dateFormatter } from "../../../utils/dateFormatter";
import { PrimaryButton } from "../../atoms/PrimaryButton";

interface RepositoriesListElementProps {
  repo: RepoType;
}

const RepositoriesListElement: FC<RepositoriesListElementProps> = ({
  repo,
}) => {
  const {
    name,
    description,
    id,
    createdAt,
    htmlUrl,
    language,
    openIssues,
    watchers,
    issuesUrl,
  } = repo;

  const transformDate = dateFormatter(createdAt, "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className={styles.repositoriesListElement}>
      <ul className={styles.list}>
        <li className={styles.name}>
          <Text as="h3" variant="body">
            {name}
          </Text>
          <Text as="p" variant="litle">
            {transformDate}
          </Text>
        </li>
        <li>
          <Text as="p" variant="litle" className={styles.label}>
            language
          </Text>
          <Text as="p" variant="litle">
            {language || "---"}
          </Text>
        </li>
        <li>
          <Text as="p" variant="litle">
            {description}
          </Text>
        </li>
        <li className={styles.watchers}>
          <Text as="p" variant="litle" className={styles.label}>
            watchers:
          </Text>
          <Text as="p" variant="litle">
            {watchers}
          </Text>
        </li>
        <li>
          <Text as="p" variant="litle" className={styles.label}>
            openIssues:
          </Text>
          <Text as="p" variant="litle">
            {openIssues}
          </Text>
        </li>
      </ul>

      <a href={htmlUrl}>
        <PrimaryButton className={styles.button}>
          <Text as="span" variant="litle">
            github
          </Text>
        </PrimaryButton>
      </a>
    </div>
  );
};

export default RepositoriesListElement;
