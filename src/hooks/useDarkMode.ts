// src/components/Header/hooks/useDarkMode.ts
import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkModePreference.matches && !document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
