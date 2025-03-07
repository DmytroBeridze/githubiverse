import { ChangeEventHandler, FC, InputHTMLAttributes } from "react";
import styles from "./PrimaryInput.module.scss";

interface PrimaryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  classLabel?: string;
  label?: string;
  error?: boolean;
}

export const PrimaryInput: FC<PrimaryInputProps> = ({
  onChange,
  className = "",
  classLabel = "",
  label = "",
  error = false,
  ...props
}) => {
  return (
    <label className={`${styles.primaryLabel} ${classLabel}`}>
      <span>{label}</span>
      <input
        className={`${styles.primaryInput} ${className} ${
          error ? styles.validError : ""
        }`}
        onChange={onChange}
        {...props}
      />
    </label>
  );
};
