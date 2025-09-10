import React from "react";
import type { Language } from "../../utils/i18n";

interface LanguageToggleProps {
  lang: Language;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang }) => {
  return (
    <div className="hidden md:flex gap-x-2 text-sm text-onSurfaceVariant font-mono">
      <a
        href="/en/"
        className={
          lang === "en"
            ? "font-bold text-primary brutal-underline"
            : "hover:text-primary brutal-underline"
        }
      >
        EN
      </a>
      <span>/</span>
      <a
        href="/es/"
        className={
          lang === "es"
            ? "font-bold text-primary brutal-underline"
            : "hover:text-primary brutal-underline"
        }
      >
        ES
      </a>
    </div>
  );
};

export default LanguageToggle;
