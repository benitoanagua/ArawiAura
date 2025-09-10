import React, { useState, useEffect } from "react";
import type { Language } from "../../utils/i18n";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";
import { BASE_SEO_CONFIG } from "../../utils/seo.constants";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  lang: Language;
  title?: string;
  nav: NavItem[];
}

const HeaderReact: React.FC<HeaderProps> = ({
  lang,
  title = BASE_SEO_CONFIG[lang].siteName,
  nav,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="border-b-3 border-outline">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <a
          href={`/${lang}/`}
          className="text-xl md:text-2xl font-mono tracking-tight text-onSurface brutal-underline"
        >
          {title}
        </a>

        {/* Desktop Navigation */}
        <DesktopNav nav={nav} />

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle lang={lang} />

          {/* Language Toggle (Desktop) */}
          <LanguageToggle lang={lang} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-onSurfaceVariant hover:text-onSurface font-mono"
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
              {isMenuOpen ? (
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        lang={lang}
        nav={nav}
      />
    </header>
  );
};

export default HeaderReact;
