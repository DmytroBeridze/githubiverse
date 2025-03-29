import { useContext } from "react";
import { useApi } from "../hooks/useApi";
import { UserDataType } from "../types/authTypes";
import localStorageUtils from "../utils/localStorageUtils";
import { NickNameContext } from "../context/NickNameContext";

export const useAuthService = () => {
  const nickNameContext = useContext(NickNameContext);

  const {
    sendRequest,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  } = useApi();
  const URL = process.env.REACT_APP_API_URL;

  const { setData } = localStorageUtils;
  const { setNickName } = nickNameContext;

  // registration
  const registerUser = async (data: UserDataType) => {
    const url = `${URL}/auth/register`;
    const response = await sendRequest(url, "POST", data);

    return response;
  };

  // login
  const loginUser = async (data: UserDataType) => {
    const url = `${URL}/auth/login`;
    const response = await sendRequest(url, "POST", data);

    if (response) {
      setData("token", response.token);
      setData("user", response.userName);
      setNickName(response.userName);
    }
    return response;
  };

  return {
    registerUser,
    loginUser,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  };
};
