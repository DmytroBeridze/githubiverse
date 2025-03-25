import { createContext } from "react";

interface FormTypeContextType {
  formType: "signup" | "login" | "";
  setFormType: React.Dispatch<React.SetStateAction<"" | "signup" | "login">>;
}

const defaultContext: FormTypeContextType = {
  formType: "login",
  setFormType: () => {},
};

export const FormTypeContext =
  createContext<FormTypeContextType>(defaultContext);
