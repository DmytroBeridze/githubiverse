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
    // setAuthor(null);
    // !------------видалити Authorization: `token ${token}`
    try {
      const response = await sendRequest(URL, "GET", null, {
        Authorization: `token ${token}`,
      });

      if (!response || !response.items || response.items.length === 0) {
        throw new Error(`User "${user}" not found.`);
        // return;
      }
      const filtered = response.items.find(
        (elem: { type: string }) => elem.type === "User"
      );

      if (!filtered) {
        // console.log(`No valid user found for "${user}".`);
        throw new Error(`No valid user found for "${user}".`);
        // return;
      }

      const extendedUser = await sendRequest(filtered.url);

      if (!extendedUser) {
        throw new Error(`Failed to fetch details for user "${user}".`);
        // console.log(`Failed to fetch details for user "${user}".`);
        // return;
      }
      const transformData = transformUserWithRepo(extendedUser);

      setAuthor(transformData);

      // --для того щоб в DevFinder перевірялися
      // getRepositories(name); pullRequest(name);   issuesQuantity(name);
      //  не отримували невірне ім'я  і не падали
      return transformData ? true : false;
    } catch (error) {
      console.error(`Error fetching user "${user}":`, error);

      if (error instanceof Error) {
        setUserError(error.message);
      }

      // console.error(`Error fetching user "${user}":`, error);
    }
  };

  return { author, getUserByName, loading, userError, setUserError };
};

export default useUserSearch;
