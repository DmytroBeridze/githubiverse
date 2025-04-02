import styles from "./RepoSlide.module.scss";
import { RepoType } from "../../../types/repoTypes";
import { FC } from "react";
import Text from "../../atoms/Text/Text";
import { dateFormatter } from "../../../utils/dateFormatter";

interface RepoSlideProps {
  repo: RepoType;
  className?: string;
}

const RepoSlide: FC<RepoSlideProps> = ({ repo, className }) => {
  const { name, createdAt, language, description, htmlUrl } = repo;
  const shortDesc =
    description.length < 150 ? description : `${description.slice(0, 150)}...`;

  const formattedDate = dateFormatter(createdAt, "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <a href={htmlUrl} className={styles.repoSlide}>
      <div className={styles.slideWrapper}>
        <Text as="h4" variant="body" className={styles.name}>
          {name}
        </Text>
        <Text as="p" variant="litle" className={styles.date}>
          {formattedDate}
        </Text>
        <Text as="p" variant="litle" className={styles.lang}>
          {language}
        </Text>
        <Text as="p" variant="litle" className={styles.desc}>
          {shortDesc}
        </Text>
      </div>
    </a>
  );
};

export default RepoSlide;
