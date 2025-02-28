import { ReactNode } from "react";
import styles from "./ContentContainer.module.scss";

interface ContentContainerProps {
  children: ReactNode;
}

export const ContentContainer = ({ children }: ContentContainerProps) => {
  return <div className={styles.contentContainer}>{children}</div>;
};
