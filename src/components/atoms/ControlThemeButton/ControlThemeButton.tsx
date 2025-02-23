import { FC } from "react";

interface ControlThemeButtonProps {
  theme: boolean;
  toggleTheme: () => void;
}

export const ControlThemeButton: FC<ControlThemeButtonProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <div onClick={toggleTheme}>
      <span>{theme ? "dark" : "light"}</span>
    </div>
  );
};
