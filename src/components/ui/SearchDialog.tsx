import React, { useState, useEffect, useCallback } from "react";
import { searchPoems, type SearchResult } from "../../utils/search";
import type { Language } from "../../utils/i18n";
import { translations } from "../../utils/i18n";

interface SearchDialogProps {
  poems?: SearchResult[];
  lang: Language;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ poems = [], lang }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchLang, setSearchLang] = useState<Language>(lang);
  const [results, setResults] = useState<SearchResult[]>([]);

  const t = translations[lang];

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    setResults(searchPoems(poems, query, searchLang));
  }, [query, searchLang, poems]);

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleEscape);
      const timer = setTimeout(() => {
        const input = document.getElementById(
          "search-input"
        ) as HTMLInputElement;
        input?.focus();
      }, 50);

      return () => {
        window.removeEventListener("keydown", handleEscape);
        clearTimeout(timer);
      };
    } else {
      window.removeEventListener("keydown", handleEscape);
    }
  }, [open, handleEscape]);

  const openModal = () => {
    setOpen(true);
    setQuery("");
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchLang(e.target.value as Language);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-primary text-onPrimary rounded-full p-4 shadow-lg z-40 hover:bg-primary/90 transition-colors"
        aria-label={t.search}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-scrim/40 z-50 flex items-center justify-center p-4"
          role="dialog"
          tabIndex={-1}
          onClick={handleOverlayClick}
        >
          <div className="bg-surfaceContainerHighest rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outlineVariant">
              <div className="flex items-center gap-2 text-sm text-onSurfaceVariant">
                <span>{t.language}:</span>
                <select
                  value={searchLang}
                  onChange={handleLanguageChange}
                  className="bg-surfaceContainer text-onSurfaceContainer rounded-sm px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                </select>
              </div>
              <button
                onClick={closeModal}
                className="text-2xl leading-none text-onSurfaceVariant hover:text-onSurface transition-colors"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-4">
              <input
                id="search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search}
                className="w-full bg-surfaceContainer text-onSurfaceContainer rounded-md px-4 py-3 text-lg outline-none placeholder:text-onSurfaceVariant"
              />
            </div>

            <div className="max-h-80 overflow-y-auto border-t border-outlineVariant">
              {results.length > 0 ? (
                <ul className="p-2">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <a
                        href={`/${p.slug}/`}
                        className="block px-4 py-3 hover:bg-surfaceContainerHighest rounded-md transition-colors text-onSurface"
                        onClick={closeModal}
                      >
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-onSurfaceVariant">
                  {query ? t.noResults : t.typeToSearch}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;
