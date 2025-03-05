import { useApi } from "../hooks/useApi";
import { UserDataType } from "../types/authTypes";

export const useAuthService = () => {
  const { userRequest, loading, error, status, message, clearError } = useApi();
  const URL = process.env.REACT_APP_API_URL;

  const registerUser = (data: UserDataType) => {
    const url = `${URL}/auth/register`;
    const request = userRequest(url, "POST", data);
    // request.then((data) => console.log(data?.message));

    return request;
  };
  const loginUser = (data: UserDataType) => {
    const url = `${URL}/auth/login`;
    const request = userRequest(url, "POST", data);

    return request;
  };

  return {
    registerUser,
    loginUser,
    loading,
    error,
    status,
    message,
    clearError,
  };
};
