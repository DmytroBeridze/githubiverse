import styles from "./RandomUserCard.module.scss";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import { User } from "../../../types/userTypes";
import { FC } from "react";
import Text from "../../atoms/Text/Text";
import { dateFormatter } from "../../../utils/dateFormatter";
import { PrimaryButton } from "../../atoms/PrimaryButton";

export type NewUser = User & {
  title: string;
};
interface RandomUserCardProps {
  author: NewUser;
}

const RandomUserCard: FC<RandomUserCardProps> = ({ author }) => {
  const {
    avatar,
    login,
    title,
    createdAt,
    location,
    name,
    followers,
    publicRepos,
    github,
    bio,
    company,
    type,
  } = author;

  const formattedDate = dateFormatter(createdAt, "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={styles.randomUserCard}>
      <div className={styles.info}>
        <Text as="h2" variant="title" className={styles.title}>
          {title}
        </Text>

        <ul>
          <li>
            <Text as="span" variant="litle">
              Nickname:
            </Text>
            <Text as={"p"} variant="body">
              {login}
            </Text>
          </li>
          <li>
            <Text as="span" variant="litle">
              Name:
            </Text>
            <Text as={"p"} variant="body">
              {name}
            </Text>
          </li>
          <li>
            <Text as="span" variant="litle">
              Location:
            </Text>
            <Text as={"p"} variant="body">
              {location}
            </Text>
          </li>
          <li>
            <Text as="span" variant="litle">
              Registration:
            </Text>
            <Text as={"p"} variant="body">
              {formattedDate}
            </Text>
          </li>
          <li>
            <Text as="span" variant="litle">
              Repositories:
            </Text>
            <Text as={"p"} variant="body">
              {publicRepos}
            </Text>
          </li>

          <li>
            <Text as="span" variant="litle">
              Followers:
            </Text>
            <Text as={"p"} variant="body">
              {followers}
            </Text>
          </li>
        </ul>

        <a href={github}>
          <PrimaryButton>More about</PrimaryButton>
        </a>
      </div>
      <UserAvatar link={avatar} alt={login} className={styles.avatar} />
    </div>
  );
};

export default RandomUserCard;
