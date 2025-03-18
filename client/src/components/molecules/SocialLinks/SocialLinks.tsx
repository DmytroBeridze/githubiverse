import styles from "./SocialLinks.module.scss";
import Icon from "../../atoms/Icon/Icon";
import { FC } from "react";

interface SocialLinksProps {
  className?: string;
}

const SocialLinks: FC<SocialLinksProps> = ({ className }) => {
  const socials = [
    {
      id: "twitter",
      icon: <Icon name="twitter" />,
      link: "https://twitter.com",
    },
    { id: "gitHub", icon: <Icon name="gitHub" />, link: "https://github.com" },
    {
      id: "linkedin",
      icon: <Icon name="linkedin" />,
      link: "https://linkedin.com",
    },
  ];

  return (
    <ul className={`${styles.social} ${className || ""}`}>
      {socials.map((elem) => (
        <li key={elem.id}>
          <a href={elem.link}>{elem.icon}</a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
