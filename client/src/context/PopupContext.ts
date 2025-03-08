import { createContext } from "react";

interface PopupContextType {
  isOpenPopup: boolean;
  popupHandler: () => void;
}

const defaultValue: PopupContextType = {
  isOpenPopup: false,
  popupHandler: () => {},
};

export const PopupContext = createContext<PopupContextType>(defaultValue);
