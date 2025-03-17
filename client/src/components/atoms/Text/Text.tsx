import { FC, ReactNode } from "react";
import styles from "./Text.module.scss";

interface TextProps {
  children: ReactNode;
  variant?: "body" | "title" | "litle" | "subtitle";
  as: "p" | "span" | "h1" | "h2" | "h3" | "h4";
  className?: string;
}

const Text: FC<TextProps> = ({
  children,
  variant = "body",
  as: Tag = "p",
  className = "",
}) => {
  return <Tag className={`${styles[variant]} ${className}`}>{children}</Tag>;
};

export default Text;
