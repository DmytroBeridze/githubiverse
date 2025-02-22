import { ReactNode } from "react";
import styles from "./ComponentContainer.module.scss";

interface ComponentContainerProps {
  children: ReactNode;
}

export const ComponentContainer = ({ children }: ComponentContainerProps) => {
  return <div className={styles.componentContainer}>{children}</div>;
};
