import React, { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("dark"); // Default theme mode

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
