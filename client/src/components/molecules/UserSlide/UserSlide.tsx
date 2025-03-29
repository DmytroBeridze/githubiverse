import styles from "./UserSlide.module.scss";
import { User } from "../../../types/userTypes";
import Text from "../../atoms/Text/Text";

interface UserSlideProps {
  user: User;
  className?: string;
}

const UserSlide = ({ user, className }: UserSlideProps) => {
  return (
    <div className={`${styles.userSlide} ${className || ""}`}>
      <div className={styles.imgWrapper}>
        <img src={user.avatar} alt="user" />
      </div>
      <a href={user.github} className={styles.infoWrapper}>
        <Text as="p" variant="litle" className={styles.name}>
          {user.name}
        </Text>
        <Text as="p" variant="litle" className={styles.name}>
          {user.login}
        </Text>
        <Text as="p" variant="litle" className={styles.name}>
          {user.location}
        </Text>
        <Text as="p" variant="litle" className={styles.name}>
          {user.company}
        </Text>
      </a>
    </div>
  );
};

export default UserSlide;
