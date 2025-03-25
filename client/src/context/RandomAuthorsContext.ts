import { createContext } from "react";
import { User } from "../types/userTypes";

interface RandomAuthorsContextType {
  authors: User[];
  error: string | null;
  loading: boolean;
}

const defaultContext: RandomAuthorsContextType = {
  authors: [],
  error: null,
  loading: false,
};

export const RandomAuthorsContext =
  createContext<RandomAuthorsContextType>(defaultContext);
