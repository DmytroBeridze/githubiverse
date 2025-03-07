import styles from "./AuthStatus.module.scss";

import { useEffect, useState } from "react";
import localStorageUtils from "../../../utils/localStorageUtils";
import { useContext } from "react";
import { PopupContext } from "../../../context/PopupContext";
import { FormTypeContext } from "../../../context/FormTypeContext";
import { NickNameContext } from "../../../context/NickNameContext";

export const AuthStatus = () => {
  const popupContext = useContext(PopupContext);
  const formTypeContext = useContext(FormTypeContext);
  const nickNameContext = useContext(NickNameContext);

  // if (!popupContext) {
  //   console.error(
  //     "ThemeContext is undefined. Make sure to wrap your app in ThemeProvider."
  //   );
  //   return null;
  // }
  const { removeData } = localStorageUtils;
  const { popupHandler } = popupContext;
  const { setFormType } = formTypeContext;
  const { nickName, setNickName } = nickNameContext;

  const signOut = () => {
    setNickName("");
    removeData("token");
    removeData("user");
  };

  return (
    <div className={styles.authStatus}>
      {nickName ? (
        <span onClick={signOut}>{nickName}</span>
      ) : (
        <span
          onClick={() => {
            popupHandler();
            setFormType("signup");
          }}
        >
          Login
        </span>
      )}
    </div>
  );
};
