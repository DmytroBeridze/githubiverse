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

  const sendForm = (data: UserDataType, key: "signup" | "signin") => {
    if (key === "signup") {
      registerUser(data);
    } else loginUser(data).then((data) => console.log(data));
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
  };
};
export default useAuthForm;
