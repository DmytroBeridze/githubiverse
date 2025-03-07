import { useEffect, useState } from "react";
import localStorageUtils from "../../../utils/localStorageUtils";
import styles from "./AuthStatus.module.scss";

export const AuthStatus = () => {
  const [user, setUser] = useState<string | null>(null);
  const { getData } = localStorageUtils;

  useEffect(() => {
    setUser(getData("user"));
  }, []);

  return (
    <div className={styles.authStatus}>
      {user ? <span>{user}</span> : <span>Login</span>}
    </div>
  );
};
