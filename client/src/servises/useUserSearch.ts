import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { transformUserWithRepo } from "../utils/dataTransformers";
import { UserWithRepo } from "../types/userTypes";

const useUserSearch = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [author, setAuthor] = useState<UserWithRepo | null>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const { sendRequest, loading } = useApi();

  // -----------------------------------------getUsersWithRepo
  const getUserByName = async (user: string) => {
    const URL = `https://api.github.com/search/users?q=${user}`;
    setUserError(null);
    try {
      const response = await sendRequest(URL);

      if (!response || !response.items || response.items.length === 0) {
        throw new Error(`User "${user}" not found.`);
      }
      const filtered = response.items.find(
        (elem: { type: string }) => elem.type === "User"
      );

      if (!filtered) {
        throw new Error(`No valid user found for "${user}".`);
      }

      const extendedUser = await sendRequest(filtered.url);

      if (!extendedUser) {
        throw new Error(`Failed to fetch details for user "${user}".`);
      }
      const transformData = transformUserWithRepo(extendedUser);

      setAuthor(transformData);

      return transformData ? true : false;
    } catch (error) {
      console.error(`Error fetching user "${user}":`, error);

      if (error instanceof Error) {
        setUserError(error.message);
      }
    }
  };

  return { author, getUserByName, loading, userError, setUserError };
};

export default useUserSearch;
