import { FC, ReactNode } from "react";
import styles from "./PrimaryButton.module.scss";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  name?: string;
  type?: "submit" | "reset" | "button";
  value?: string;
}

export const PrimaryButton = ({
  onClick,
  children,
  className = "",
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      type={props.type || "button"}
      onClick={onClick}
      className={`${styles.primaryButton} ${className}`}
    >
      {children}
    </button>
  );
};
