import React, { useState, useEffect } from "react";
import type { Language } from "../../utils/i18n";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  lang: Language;
  title: string;
  nav: NavItem[];
}

const HeaderReact: React.FC<HeaderProps> = ({ lang, title, nav }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <header className="border-b border-outlineVariant">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <a
          href={`/${lang}/`}
          className="text-xl md:text-2xl font-serif tracking-tight text-onSurface"
        >
          {title}
        </a>

        <ul className="hidden md:flex gap-x-6 text-sm uppercase tracking-wider text-onSurfaceVariant">
          {nav.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-x-2 text-sm text-onSurfaceVariant">
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

        <button
          className="md:hidden text-onSurfaceVariant hover:text-onSurface transition-colors"
          aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <>
          <button
            className="md:hidden fixed inset-0 bg-scrim/60 z-40"
            aria-label={lang === "es" ? "Cerrar overlay" : "Close overlay"}
            onClick={closeMenu}
          />

          <div
            className="md:hidden fixed top-0 right-0 h-full w-64 bg-surfaceContainerHighest shadow-xl z-50 
                       flex flex-col p-6 space-y-4"
          >
            <button
              className="self-end text-2xl text-onSurfaceVariant hover:text-onSurface transition-colors"
              aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
              onClick={closeMenu}
            >
              &times;
            </button>

            {nav.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm uppercase tracking-wider text-onSurfaceVariant hover:text-primary transition-colors"
                onClick={closeMenu}
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
      )}
    </header>
  );
};

export default HeaderReact;
