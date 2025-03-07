import { FC, useEffect, useState } from "react";
import Icon from "../../atoms/Icon/Icon";
import { PrimaryButton } from "../../atoms/PrimaryButton";
import { AuthForm } from "../../molecules/AuthForm/AuthForm";
import styles from "./RegistrationPopup.module.scss";

export interface RegistrationPopupProps {
  burgerHandler: () => void;
  isOpenBurger: boolean;
  formType: "signup" | "login" | "";
}

export const RegistrationPopup: FC<RegistrationPopupProps> = ({
  isOpenBurger,
  burgerHandler,
  formType,
}) => {
  useEffect(() => {
    if (!isOpenBurger) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        burgerHandler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.addEventListener("keydown", handleKeyDown);
  }, [burgerHandler]);

  return isOpenBurger ? (
    <div className={styles.popup} onClick={burgerHandler}>
      <AuthForm
        isOpenBurger={isOpenBurger}
        burgerHandler={burgerHandler}
        formType={formType}
      />
    </div>
  ) : null;
};
