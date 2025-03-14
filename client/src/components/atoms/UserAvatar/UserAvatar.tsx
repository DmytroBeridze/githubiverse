import { FC } from "react";
import styles from "./UserAvatar.module.scss";

interface UserAvatarProps {
  link: string;
  alt: string;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ link, alt, className = "" }) => {
  return (
    <div className={`${styles.avatar} ${className}`}>
      <img
        src={link}
        alt={alt}
        loading="lazy"
        onError={(e) =>
          (e.currentTarget.src = "../../../resources/icons/user_plug.png")
        }
      />
    </div>
  );
};

export default UserAvatar;
