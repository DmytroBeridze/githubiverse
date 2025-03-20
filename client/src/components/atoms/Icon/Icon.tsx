import { FC } from "react";
import { ReactComponent as DefaultIcon } from "../../../resources/icons/instagram.svg";
import { ReactComponent as Instagram } from "../../../resources/icons/instagram.svg";
import { ReactComponent as ArrowMore } from "../../../resources/icons/arrowMore.svg";
import { ReactComponent as Burger } from "../../../resources/icons/burger.svg";
import { ReactComponent as Close } from "../../../resources/icons/close.svg";
import { ReactComponent as Sun } from "../../../resources/icons/sun.svg";
import { ReactComponent as Moon } from "../../../resources/icons/moon.svg";
import { ReactComponent as User } from "../../../resources/icons/user.svg";
import { ReactComponent as Twitter } from "../../../resources/icons/twitter.svg";
import { ReactComponent as GitHub } from "../../../resources/icons/github.svg";
import { ReactComponent as Linkedin } from "../../../resources/icons/linkedin.svg";
import { ReactComponent as Search } from "../../../resources/icons/search.svg";

interface IconProps {
  name:
    | "instagram"
    | "twitter"
    | "gitHub"
    | "linkedin"
    | "arrowMore"
    | "burger"
    | "close"
    | "sun"
    | "moon"
    | "search"
    | "user";
  size?: string;
  color?: string;
  onClick?: () => void;
}

const Icon: FC<IconProps> = ({
  name,
  size = "24",
  color = "currentcolor",
  onClick,
}) => {
  const icons = {
    instagram: Instagram,
    twitter: Twitter,
    gitHub: GitHub,
    linkedin: Linkedin,
    arrowMore: ArrowMore,
    burger: Burger,
    close: Close,
    sun: Sun,
    moon: Moon,
    user: User,
    search: Search,
  };

  const IconComponent = icons[name] || DefaultIcon;
  return (
    <IconComponent
      style={{ fill: color, stroke: color }}
      width={size}
      height={size}
      onClick={onClick}
    />
  );
};

export default Icon;
