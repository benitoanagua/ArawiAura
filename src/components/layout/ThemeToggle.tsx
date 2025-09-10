import React, { useState, useEffect } from "react";
import type { Language } from "../../utils/i18n";
import { translations } from "../../utils/i18n";

interface ThemeToggleProps {
  lang: Language;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ lang }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = saved === "light" || saved === "dark" ? saved : system;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const t = translations[lang];

  return (
    <button
      onClick={toggle}
      className="p-2 border-2 border-outline bg-surface text-onSurface hover:bg-primary hover:text-onPrimary font-mono text-xs uppercase"
      aria-label={theme === "light" ? t.switchToDark : t.switchToLight}
      title={theme === "light" ? t.switchToDark : t.switchToLight}
    >
      {theme === "light" ? "DARK" : "LIGHT"}
    </button>
  );
};

export default ThemeToggle;
