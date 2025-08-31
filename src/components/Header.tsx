import React, { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  lang: "es" | "en";
  title: string;
  nav: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ lang, title, nav }) => {
  const [open, setOpen] = useState(false);

  // Efecto para limpiar el scroll cuando se abre el drawer
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleOverlayClick = () => {
    setOpen(false);
  };

  return (
    <header className="border-b border-stone-200 dark:border-stone-800">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <a
          href={`/${lang}/`}
          className="text-xl md:text-2xl font-serif tracking-tight"
        >
          {title}
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-x-6 text-sm uppercase tracking-wider">
          {nav.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="hover:text-teal-600 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop lang */}
        <div className="hidden md:flex gap-x-2 text-sm">
          <a
            href="/en/"
            className={
              lang === "en"
                ? "font-bold"
                : "hover:text-teal-600 transition-colors"
            }
          >
            EN
          </a>
          <span>/</span>
          <a
            href="/es/"
            className={
              lang === "es"
                ? "font-bold"
                : "hover:text-teal-600 transition-colors"
            }
          >
            ES
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
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

      {/* Mobile drawer */}
      {open && (
        <>
          {/* Overlay */}
          <button
            className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            aria-label={lang === "es" ? "Cerrar overlay" : "Close overlay"}
            onClick={handleOverlayClick}
          />

          {/* Panel */}
          <div
            className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-stone-900 shadow-xl z-50 
                       flex flex-col p-6 space-y-4 transform transition-transform duration-300 ${
                         open ? "translate-x-0" : "translate-x-full"
                       }`}
          >
            <button
              className="self-end text-2xl text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
              onClick={closeMenu}
            >
              &times;
            </button>

            {nav.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm uppercase tracking-wider hover:text-teal-600 transition-colors"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}

            <hr className="border-stone-300 dark:border-stone-700" />

            <div className="flex gap-x-2 text-sm">
              <a
                href="/en/"
                className={
                  lang === "en"
                    ? "font-bold"
                    : "hover:text-teal-600 transition-colors"
                }
              >
                EN
              </a>
              <span>/</span>
              <a
                href="/es/"
                className={
                  lang === "es"
                    ? "font-bold"
                    : "hover:text-teal-600 transition-colors"
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

export default Header;
