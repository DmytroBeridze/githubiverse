import { FC, useEffect, useState } from "react";
import Icon from "../../atoms/Icon/Icon";
import { PrimaryButton } from "../../atoms/PrimaryButton";
import { PrimaryInput } from "../../atoms/PrimaryInput";
import { RegistrationPopupProps } from "../../organisms/RegistrationPopup";
import styles from "./AuthForm.module.scss";
import useAuthForm from "../../../hooks/useAuthForm";

interface AuthFormProps extends RegistrationPopupProps {}

export const AuthForm: FC<AuthFormProps> = ({ burgerHandler, formType }) => {
  const {
    handleNameChange,
    handlePassChange,
    sendForm,
    name,
    pass,
    user,
    loading,
    error,
    status,
    message,
    clearError,
  } = useAuthForm();

  const messageLogger = () => {
    setTimeout(() => {
      clearError();
    }, 3000);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <form
      className={styles.form}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
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
        name="name"
        type="text"
        value={name}
        className={styles.name}
        label="Name"
        classLabel={styles.label}
        onChange={(e) => handleNameChange(e)}
      />
      <PrimaryInput
        name="password"
        type="password"
        value={pass}
        className={styles.pass}
        label="Password"
        classLabel={styles.label}
        onChange={(e) => handlePassChange(e)}
      />

      {error && <div className={styles.error}>{error}</div>}
      {!error && message && <div className={styles.message}>{message}</div>}
      <PrimaryButton
        className={styles.button}
        onClick={() => {
          sendForm(user, "signin");
          clearError();
        }}
      >
        Sign in
      </PrimaryButton>

      {formType === "signup" ? (
        <PrimaryButton
          className={styles.button}
          onClick={() => {
            sendForm(user, "signup");
            clearError();
          }}
        >
          Sign up
        </PrimaryButton>
      ) : null}
    </form>
  );
};
