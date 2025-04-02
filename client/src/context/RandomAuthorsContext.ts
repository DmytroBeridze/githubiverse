import { createContext } from "react";
import { User } from "../types/userTypes";

interface RandomAuthorsContextType {
  authors: User[];
  randomIssuesError: string | null;
  loading: boolean;
}

const defaultContext: RandomAuthorsContextType = {
  authors: [],
  randomIssuesError: null,
  loading: false,
};

export const RandomAuthorsContext =
  createContext<RandomAuthorsContextType>(defaultContext);
