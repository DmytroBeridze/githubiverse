import { FC, ReactNode } from "react";
import styles from "./PrimaryButton.module.scss";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export const PrimaryButton = ({
  onClick,
  children,
  className = "",
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.primaryButton} ${className}`}
    >
      {children}
    </button>
  );
};
