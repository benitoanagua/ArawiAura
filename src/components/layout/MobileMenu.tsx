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
        aria-label={lang === "es" ? "Cerrar overlay" : "Close overlay"}
        onClick={onClose}
      />

      <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-surfaceContainerHighest shadow-xl z-50 flex flex-col p-6 space-y-4">
        <button
          className="self-end text-2xl text-onSurfaceVariant hover:text-onSurface transition-colors"
          aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
          onClick={onClose}
        >
          &times;
        </button>

        {nav.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="text-sm uppercase tracking-wider text-onSurfaceVariant hover:text-primary transition-colors"
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}

        <hr className="border-outlineVariant" />

        <div className="flex gap-x-2 text-sm text-onSurfaceVariant">
          <a
            href="/en/"
            className={
              lang === "en"
                ? "font-bold text-primary"
                : "hover:text-primary transition-colors"
            }
          >
            EN
          </a>
          <span>/</span>
          <a
            href="/es/"
            className={
              lang === "es"
                ? "font-bold text-primary"
                : "hover:text-primary transition-colors"
            }
          >
            ES
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
