import React from "react";
import type { Language } from "../../utils/i18n";

interface LanguageToggleProps {
  lang: Language;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang }) => {
  return (
    <div className="hidden md:flex gap-2 font-mono text-xs uppercase">
      <a
        href="/en/"
        className={`px-2 py-1 border-2 ${
          lang === "en"
            ? "bg-primary text-onPrimary border-primary"
            : "bg-surface text-onSurface border-outline hover:bg-primary hover:text-onPrimary"
        }`}
      >
        EN
      </a>
      <a
        href="/es/"
        className={`px-2 py-1 border-2 ${
          lang === "es"
            ? "bg-primary text-onPrimary border-primary"
            : "bg-surface text-onSurface border-outline hover:bg-primary hover:text-onPrimary"
        }`}
      >
        ES
      </a>
    </div>
  );
};

export default LanguageToggle;
