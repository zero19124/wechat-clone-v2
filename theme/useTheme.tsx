import { useState, useContext, createContext, useEffect } from "react";
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
const getCommonStyle = (theme: TThemeType["themeColor"]) => {
  if (!theme) {
    console.log("theme is ll getCommonStyle");
    return {};
  }
  return {
    commonBorderBottom: {
      borderBottomColor: theme.fillColor,
      borderBottomWidth: 2,
    },
  };
};
// Types
export interface ThemeContextInterface extends TThemeType {
  setTheme: (value: TThemeType) => void;
  commentStyle: ReturnType<typeof getCommonStyle>;
}

// Context
const ThemeContext = createContext({} as ThemeContextInterface);

// Provider to be used in index/App/or top of any parent
export const ThemeProvider = ({ children }: any): JSX.Element => {
  const [theme, setTheme] = useState(light);
  console.log("ThemeProvider");
  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        setTheme,
      }}
    >
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
    // console.log(themeName, "state", theme, themes.themeColor.white);
  };
  useEffect(() => {
    setTheme(themeName === "light" ? light : dark);
  }, [themeName]);

  return {
    ...themes,
    themeName,
    setThemeName,
    toggleTheme,
    commonStyle: getCommonStyle(themes.themeColor),
  };
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
