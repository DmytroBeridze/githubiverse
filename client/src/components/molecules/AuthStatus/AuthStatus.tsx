import styles from "./AuthStatus.module.scss";

import localStorageUtils from "../../../utils/localStorageUtils";
import { useContext } from "react";
import { PopupContext } from "../../../context/PopupContext";
import { FormTypeContext } from "../../../context/FormTypeContext";
import { NickNameContext } from "../../../context/NickNameContext";
import { Tooltip } from "react-tooltip";
import Icon from "../../atoms/Icon/Icon";

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
        <span
          onClick={signOut}
          data-tooltip-id="auth"
          data-tooltip-content="Logout :("
        >
          <Icon name="user" />
          {nickName}
        </span>
      ) : (
        <span
          onClick={() => {
            popupHandler();
            setFormType("signup");
          }}
          data-tooltip-id="auth"
          data-tooltip-content="Login =)"
        >
          Login
        </span>
      )}
      <Tooltip
        id="auth"
        className={`tooltip ${nickName ? "Logout" : "Login"}`}
      />
    </div>
  );
};
