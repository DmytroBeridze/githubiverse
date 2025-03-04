import { FC, InputHTMLAttributes } from "react";
import styles from "./PrimaryInput.module.scss";

interface PrimaryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  classLabel?: string;
  label?: string;
}

export const PrimaryInput: FC<PrimaryInputProps> = ({
  className = "",
  classLabel = "",
  label = "",
  ...props
}) => {
  return (
    <label className={`${styles.primaryLabel} ${classLabel}`}>
      <span>{label}</span>
      <input className={`${styles.primaryInput} ${className}`} {...props} />
    </label>
  );
};
