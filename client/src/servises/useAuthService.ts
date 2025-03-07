import { useApi } from "../hooks/useApi";
import { UserDataType } from "../types/authTypes";
import localStorageUtils from "../utils/localStorageUtils";

export const useAuthService = () => {
  const {
    userRequest,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  } = useApi();
  const URL = process.env.REACT_APP_API_URL;
  const { setData } = localStorageUtils;

  const registerUser = async (data: UserDataType) => {
    const url = `${URL}/auth/register`;
    const response = await userRequest(url, "POST", data);

    return response;
  };
  const loginUser = async (data: UserDataType) => {
    const url = `${URL}/auth/login`;
    const response = await userRequest(url, "POST", data);

    if (response) {
      setData("token", response.token);
      setData("user", response.userName);
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
