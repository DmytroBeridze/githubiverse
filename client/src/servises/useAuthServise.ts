import { useApi } from "../hooks/useApi";

export const useAuthServise = () => {
  const { userRequest, loading, error, status, message, clearError } = useApi();
  const URL = process.env.REACT_APP_API_URL;

  const registerUser = () => {
    const url = `${URL}/auth/register`;

    const request = userRequest(url, "POST", {
      userName: "qweqwe",
      pass: "123",
    });
    // request.then((data) => console.log(data?.message));

    // return request;
  };

  return { registerUser, loading, error, status, message, clearError };
};
