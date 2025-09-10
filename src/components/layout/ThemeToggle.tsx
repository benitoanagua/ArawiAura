import React, { useState, useEffect } from "react";
import type { Language } from "../../utils/i18n";
import { translations } from "../../utils/i18n";

interface ThemeToggleProps {
  lang: Language;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ lang }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const t = translations[lang];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 brutal-border hover:bg-surfaceContainerHighest font-mono"
      aria-label={theme === "light" ? t.switchToDark : t.switchToLight}
      title={theme === "light" ? t.switchToDark : t.switchToLight}
    >
      {theme === "light" ? (
        <span className="icon-[streamline-sharp--dark-display-mode-solid] h-5 w-5 text-onSurface"></span>
      ) : (
        <span className="icon-[streamline-sharp--light-dark-mode-remix] h-5 w-5 text-onSurface"></span>
      )}
    </button>
  );
};

export default ThemeToggle;
