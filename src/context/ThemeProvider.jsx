import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div
        style={{
          background: dark ? "#0f172a" : "#f1f5f9",
          minHeight: "100vh",
          color: dark ? "white" : "black",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}