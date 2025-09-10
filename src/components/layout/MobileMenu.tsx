import React from "react";
import type { Language } from "../../utils/i18n";

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
  if (!isOpen) return null;

  return (
    <>
      <button
        className="md:hidden fixed inset-0 bg-scrim/90 z-40"
        aria-label={lang === "es" ? "Cerrar overlay" : "Close overlay"}
        onClick={onClose}
      />

      <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-surfaceContainerHighest border-l-3 border-outline z-50 flex flex-col p-6 space-y-4">
        <button
          className="self-end text-2xl text-onSurfaceVariant hover:text-onSurface font-mono"
          aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
          onClick={onClose}
        >
          &times;
        </button>

        {nav.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="text-sm uppercase tracking-wider text-onSurfaceVariant hover:text-primary brutal-underline font-mono"
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}

        <hr className="border-outline" />

        <div className="flex gap-x-2 text-sm text-onSurfaceVariant font-mono">
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
      </div>
    </>
  );
};

export default MobileMenu;
