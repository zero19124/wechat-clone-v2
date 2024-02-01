import { useState, useContext, createContext } from "react";
import * as light from "./light";
import * as dark from "./dark";

export type TThemeType = {
  themeColor: typeof light.themeColor;
  text: typeof light.text;
  color: typeof light.color;
  bg: typeof light.bg;
  border: typeof light.border;
};

export type TThemeName = "dark" | "light";

// Types
export interface ThemeContextInterface extends TThemeType {
  setTheme: (value: TThemeType) => void;
}

// Context
const ThemeContext = createContext({} as ThemeContextInterface);

// Provider to be used in index/App/or top of any parent
export const ThemeProvider = ({ children }: any): JSX.Element => {
  const [theme, setTheme] = useState(light);
  console.log("ThemeProvider");
  return (
    <ThemeContext.Provider value={{ ...theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// useTheme hook for easy access to theme and setTheme
export const useTheme = () => {
  const state = useContext(ThemeContext);
  const [themeName, setThemeName] = useState<TThemeName>("light");

  const { setTheme, ...themes } = state;
  const toggleTheme = (theme: TThemeName) => {
    setThemeName(theme);
    setTheme(theme === "light" ? light : dark);
    console.log(themeName, "state", themes.themeColor.white);
  };
  return { ...themes, themeName, toggleTheme };
};

export const useText = () => {
  const { text } = useTheme();
  return text;
};

export const useColor = () => {
  const { color } = useTheme();
  return color;
};

export const useBackground = () => {
  const { bg } = useTheme();
  return bg;
};
