import React, { useState, useEffect } from "react";
import type { Language } from "../../utils/i18n";
import { translations } from "../../utils/i18n";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const t = translations[lang];

  // Detectar el tema inicial
  useEffect(() => {
    const detectTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const html = document.documentElement;

      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme);
      } else {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        setTheme(systemTheme);
      }
    };

    detectTheme();
  }, []);

  // Cambiar entre temas (lógica simplificada como en Svelte)
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const html = document.documentElement;
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

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

        <div className="flex items-center gap-4">
          {/* Selector de tema (simplificado como en Svelte) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surfaceContainerHighest transition-colors"
            aria-label={theme === "light" ? t.switchToDark : t.switchToLight}
          >
            {theme === "light" ? (
              // Icono de luna (tema claro activado)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-onSurface"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              // Icono de sol (tema oscuro activado)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-onSurface"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Selector de idioma para desktop */}
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

          {/* Menú hamburguesa para mobile */}
          <button
            className="md:hidden text-onSurfaceVariant hover:text-onSurface transition-colors"
            aria-label={t.search}
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
        </div>
      </nav>

      {/* Mobile drawer */}
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

            {/* Selector de tema en móvil */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-sm uppercase tracking-wider text-onSurfaceVariant hover:text-primary transition-colors"
            >
              {theme === "light" ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  {t.darkTheme}
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t.lightTheme}
                </>
              )}
            </button>

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
