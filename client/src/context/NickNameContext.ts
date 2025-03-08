import { createContext } from "react";

interface NickNameContextType {
  nickName: string | null;
  setNickName: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultValue: NickNameContextType = {
  nickName: "",
  setNickName: () => {},
};

export const NickNameContext = createContext<NickNameContextType>(defaultValue);
