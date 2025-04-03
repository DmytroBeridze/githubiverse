import { FC, useEffect } from "react";
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

  return (
    <div
      className={`${styles.popup} ${isOpenBurger ? styles.open : ""}`}
      onClick={() => {
        popupHandler();
      }}
    >
      <AuthForm
        isOpenBurger={isOpenBurger}
        popupHandler={popupHandler}
        formType={formType}
      />
    </div>
  );
};
