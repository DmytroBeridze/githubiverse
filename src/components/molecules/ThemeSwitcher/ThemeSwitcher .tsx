import { useEffect, useState } from "react";
import { ControlThemeButton } from "../../atoms/ControlThemeButton";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => !theme);
  };

  useEffect(() => {
    theme
      ? document.body.setAttribute("data-theme", "light")
      : document.body.setAttribute("data-theme", "dark");
  }, [theme]);

  return (
    <>
      <ControlThemeButton theme={theme} toggleTheme={toggleTheme} />
    </>
  );
};
