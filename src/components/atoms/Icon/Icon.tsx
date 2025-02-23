import styles from "./Icon.module.scss";
import { FC, ReactNode } from "react";
import { ReactComponent as DefaultIcon } from "../../../resources/icons/instagram.svg";
import { ReactComponent as Instagram } from "../../../resources/icons/instagram.svg";
import { ReactComponent as Twitter } from "../../../resources/icons/twitter.svg";
import { ReactComponent as ArrowMore } from "../../../resources/icons/arrowMore.svg";

interface IconProps {
  name: "instagram" | "twitter" | "arrowMore";
  size?: string;
  color?: string;
}

const Icon: FC<IconProps> = ({ name, size = "24", color = "black" }) => {
  const icons = {
    instagram: Instagram,
    twitter: Twitter,
    arrowMore: ArrowMore,
  };

  const IconComponent = icons[name] || DefaultIcon;
  return <IconComponent fill={color} width={size} height={size} />;
};

export default Icon;
