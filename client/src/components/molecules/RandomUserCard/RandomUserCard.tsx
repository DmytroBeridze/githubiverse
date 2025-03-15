import styles from "./RandomUserCard.module.scss";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar";
import { User } from "../../../types/userTypes";
import { FC } from "react";

interface RandomUserCardProps {
  author: User;
}

const RandomUserCard: FC<RandomUserCardProps> = ({ author }) => {
  const { avatar, login } = author;
  return (
    <div className={styles.randomUserCard}>
      <div className={styles.info}></div>
      <UserAvatar link={avatar} alt={login} className={styles.avatar} />
    </div>
  );
};

export default RandomUserCard;
