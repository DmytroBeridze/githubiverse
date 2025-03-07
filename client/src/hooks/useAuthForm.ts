import { useState } from "react";
import { UserDataType } from "../types/authTypes";
import { useAuthService } from "../servises/useAuthService";

const useAuthForm = () => {
  const [name, setName] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const {
    registerUser,
    loginUser,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  } = useAuthService();

  const user: UserDataType = {
    userName: name,
    pass,
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const clearFields = (resp: UserDataType) => {
    if (resp) {
      setName("");
      setPass("");
    }
  };

  const sendForm = (data: UserDataType, key: "signup" | "signin") => {
    if (key === "signup") {
      registerUser(data).then((resp) => {
        clearFields(resp);
      });
    } else
      loginUser(data).then((resp) => {
        clearFields(resp);
      });
  };

  return {
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
  };
};
export default useAuthForm;
