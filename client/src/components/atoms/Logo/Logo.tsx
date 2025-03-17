import { FC } from "react";
import Text from "../Text/Text";
import styles from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={`${styles.logo} ${className || ""}`}>
      <Text as="h4" variant="title">
        © GH
      </Text>
      <Text as="h4" variant="title">
        GitHubiverse
      </Text>
    </div>
  );
};

export default Logo;
