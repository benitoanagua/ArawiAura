import React from "react";
import type { Language } from "../../utils/i18n";
import { translations } from "../../utils/i18n";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  nav: NavItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  lang,
  nav,
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <>
      <button
        className="md:hidden fixed inset-0 bg-scrim/60 z-40"
        onClick={onClose}
        aria-label="Close overlay"
      />
      <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-surfaceContainerHighest border-l-4 border-primary z-50 flex flex-col p-6 space-y-4">
        <button
          className="self-end text-2xl font-mono text-onSurfaceVariant hover:text-primary"
          onClick={onClose}
        >
          ×
        </button>

        {nav.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={onClose}
            className="font-mono text-sm uppercase tracking-wide text-onSurfaceVariant hover:text-primary border-b-2 border-transparent hover:border-primary"
          >
            {item.label}
          </a>
        ))}

        <hr className="border-outline" />

        <div className="flex gap-2 font-mono text-xs">
          <a
            href="/en/"
            className={`px-2 py-1 border-2 ${
              lang === "en"
                ? "bg-primary text-onPrimary border-primary"
                : "bg-surface text-onSurface border-outline"
            }`}
          >
            EN
          </a>
          <a
            href="/es/"
            className={`px-2 py-1 border-2 ${
              lang === "es"
                ? "bg-primary text-onPrimary border-primary"
                : "bg-surface text-onSurface border-outline"
            }`}
          >
            ES
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
