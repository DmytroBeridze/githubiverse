import { useApi } from "../hooks/useApi";

export const useAuthServise = () => {
  const { userRequest, loading, error, status, message, clearError } = useApi();

  const registerUser = () => {
    const url = "http://localhost:5000/auth/register";

    const request = userRequest(url, "POST", {
      userName: "wef12",
      pass: "1111",
    });
    request.then((data) => console.log(data?.message));

    // return request;
  };

  return { registerUser, loading, error, status, message, clearError };
};
