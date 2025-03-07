import { FC, useEffect, useState } from "react";
import Icon from "../../atoms/Icon/Icon";
import { PrimaryButton } from "../../atoms/PrimaryButton";
import { AuthForm } from "../../molecules/AuthForm/AuthForm";
import styles from "./RegistrationPopup.module.scss";

export interface RegistrationPopupProps {
  popupHandler: () => void;
  isOpenBurger: boolean;
  formType: "signup" | "login" | "";
}

export const RegistrationPopup: FC<RegistrationPopupProps> = ({
  isOpenBurger,
  popupHandler,
  formType,
}) => {
  useEffect(() => {
    if (!isOpenBurger) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        popupHandler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.addEventListener("keydown", handleKeyDown);
  }, [popupHandler]);

  return isOpenBurger ? (
    <div className={styles.popup} onClick={popupHandler}>
      <AuthForm
        isOpenBurger={isOpenBurger}
        popupHandler={popupHandler}
        formType={formType}
      />
    </div>
  ) : null;
};
