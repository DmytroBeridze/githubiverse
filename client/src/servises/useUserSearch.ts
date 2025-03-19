import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { transformUserWithRepo } from "../utils/dataTransformers";
import { UserWithRepo } from "../types/userTypes";

const useUserSearch = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [author, setAuthor] = useState<UserWithRepo | null>(null);
  const {
    sendRequest,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  } = useApi();

  // -----------------------------------------getUsersWithRepo
  const getUserByName = async (user: string = "karpathy") => {
    // const getUserByName = async (user: string = "dmytroberidze") => {
    const URL = `https://api.github.com/search/users?q=${user}`;

    // !------------видалити Authorization: `token ${token}`
    try {
      const response = await sendRequest(URL, "GET", null, {
        Authorization: `token ${token}`,
      });

      if (!response || !response.items) {
        console.log("No such user");
        return;
      }
      const filtered = response.items.find(
        (elem: { type: string }) => elem.type === "User"
      );

      if (!filtered) {
        console.log(`No valid user found for "${user}".`);
        return;
      }

      const extendedUser = await sendRequest(filtered.url);

      if (!extendedUser) {
        console.log(`Failed to fetch details for user "${user}".`);
        return;
      }
      const transformData = transformUserWithRepo(extendedUser);
      setAuthor(transformData);
    } catch (error) {
      console.error(`Error fetching user "${user}":`, error);
    }
  };

  return { author, getUserByName };
};

export default useUserSearch;
