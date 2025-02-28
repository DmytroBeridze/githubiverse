import { useContext, useEffect, useState } from "react";
import { ControlThemeButton } from "../../atoms/ControlThemeButton";
import { ThemeContext } from "../../../context/ThemeContext";

export const ThemeSwitcher = () => {
  // const [theme, setTheme] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeSwitcher must be used within a ThemeProvider");
  }
  const { theme, setTheme } = themeContext;
  const toggleTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    theme
      ? document.body.setAttribute("data-theme", "dark")
      : document.body.setAttribute("data-theme", "light");
  }, [theme]);

  return (
    <>
      <ControlThemeButton theme={theme} toggleTheme={toggleTheme} />
    </>
  );
};
