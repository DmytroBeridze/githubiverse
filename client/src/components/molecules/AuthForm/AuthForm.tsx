import { FC, useEffect, useState } from "react";
import Icon from "../../atoms/Icon/Icon";
import { PrimaryButton } from "../../atoms/PrimaryButton";
import { PrimaryInput } from "../../atoms/PrimaryInput";
import { RegistrationPopupProps } from "../../organisms/RegistrationPopup";
import styles from "./AuthForm.module.scss";
import useAuthForm from "../../../hooks/useAuthForm";
import { validationUtils } from "../../../utils/validationUtils";

interface AuthFormProps extends RegistrationPopupProps {}

export const AuthForm: FC<AuthFormProps> = ({ popupHandler, formType }) => {
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({
    name: null,
    pass: null,
  });

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
    clearMessage,
  } = useAuthForm();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
        clearMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // validation
  const handleValidation = async () => {
    const { isValid, errors } = await validationUtils(name, pass);
    if (!isValid) {
      setValidationErrors(errors);
    } else setValidationErrors({ name: null, pass: null });

    return isValid;
  };

  // submit
  const submitData = async (typeRequest: "signup" | "signin") => {
    const isValid = await handleValidation();
    if (isValid) {
      sendForm(user, typeRequest);
      clearError();
    }
  };

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
          popupHandler();
        }}
      >
        <Icon name="close" size="20" />
      </span>

      <PrimaryInput
        name="name"
        type="text"
        value={name}
        className={`${styles.name} `}
        error={!!validationErrors.name}
        label="Name"
        classLabel={styles.label}
        onChange={(e) => handleNameChange(e)}
      />
      {validationErrors.name ? (
        <span className={styles.errorText}>{validationErrors.name}</span>
      ) : null}
      <PrimaryInput
        name="password"
        type="password"
        value={pass}
        error={!!validationErrors.pass}
        className={`${styles.pass} `}
        label="Password"
        classLabel={styles.label}
        onChange={(e) => handlePassChange(e)}
      />
      {validationErrors.pass ? (
        <span className={styles.errorText}>{validationErrors.pass}</span>
      ) : null}

      {error && <div className={styles.error}>{error}</div>}
      {!error &&
        !validationErrors.pass &&
        !validationErrors.name &&
        message && <div className={styles.message}>{message}</div>}

      <PrimaryButton
        className={styles.button}
        onClick={() => {
          submitData("signin");
        }}
      >
        Sign in
      </PrimaryButton>

      {formType === "signup" ? (
        <PrimaryButton
          className={styles.button}
          onClick={() => submitData("signup")}
        >
          Sign up
        </PrimaryButton>
      ) : null}
    </form>
  );
};
