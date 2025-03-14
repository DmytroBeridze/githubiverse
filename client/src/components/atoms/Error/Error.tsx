import { HTMLAttributes, ReactNode } from "react";
import styles from "./Error.module.scss";

interface ErrorProps {
  child: ReactNode;
  className?: string;
}

const Error = ({ child, className }: ErrorProps) => {
  return <div className={`${styles.error} ${className || ""}`}>{child}</div>;
};

export default Error;
