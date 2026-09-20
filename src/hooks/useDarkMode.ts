import { useEffect, useState } from "react";

function savedTheme() {
  try { return localStorage.getItem("theme"); } catch { return null; }
}

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = savedTheme();
    return stored === "dark" || (stored !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (!savedTheme()) setIsDarkMode(media.matches); };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* Theme still works without storage. */ }
    setIsDarkMode(next);
  };
  return { isDarkMode, toggleDarkMode };
}
