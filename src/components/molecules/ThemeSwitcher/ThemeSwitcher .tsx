import { useEffect, useState } from "react";
import { ControlThemeButton } from "../../atoms/ControlThemeButton";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<boolean>(false);

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
