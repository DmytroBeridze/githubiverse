import { FC } from "react";
import Icon from "../../atoms/Icon/Icon";
import { PrimaryButton } from "../../atoms/PrimaryButton";
import { PrimaryInput } from "../../atoms/PrimaryInput";
import { RegistrationPopupProps } from "../../organisms/RegistrationPopup";
import styles from "./AuthForm.module.scss";

interface AuthFormProps extends RegistrationPopupProps {}

export const AuthForm: FC<AuthFormProps> = ({ burgerHandler }) => {
  return (
    <form className={styles.form}>
      <span
        className={styles.iconContainer}
        onClick={(e) => {
          e.stopPropagation();
          burgerHandler();
        }}
      >
        <Icon name="close" size="20" />
      </span>

      <PrimaryInput
        type="text"
        className={styles.name}
        label="Name"
        classLabel={styles.label}
      />
      <PrimaryInput
        type="password"
        className={styles.pass}
        label="Password"
        classLabel={styles.label}
      />
      <PrimaryButton
        onClick={() => console.log("Sign in")}
        className={styles.button}
      >
        Sign in
      </PrimaryButton>
      <PrimaryButton
        onClick={() => console.log("Sign up")}
        className={styles.button}
      >
        Sign up
      </PrimaryButton>
    </form>
  );
};
