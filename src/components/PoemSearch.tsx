import React, { useState, useEffect, useCallback } from "react";

interface Poem {
  slug: string;
  title: string;
  lang: string;
  body: string;
}

interface PoemSearchProps {
  poems?: Poem[];
  lang: "es" | "en";
}

const PoemSearch: React.FC<PoemSearchProps> = ({ poems = [], lang }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchLang, setSearchLang] = useState<"es" | "en">(lang);
  const [results, setResults] = useState<Poem[]>([]);

  // Función para manejar escape
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  // Efecto para filtrar resultados cuando cambie la query
  useEffect(() => {
    if (query) {
      const q = query.toLowerCase();
      const filtered = poems
        .filter((p) => p.lang === searchLang)
        .filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.body.toLowerCase().includes(q)
        )
        .slice(0, 10);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, searchLang, poems]);

  // Efecto para manejar eventos de teclado y foco
  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleEscape);
      // Focus en el input después de que se abra el modal
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

  const focusInput = () => {
    const input = document.getElementById("search-input") as HTMLInputElement;
    input?.focus();
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchLang(e.target.value as "es" | "en");
    focusInput();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Botón flotante MD3 */}
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-primary text-onPrimary rounded-full p-4 shadow-lg z-40 hover:bg-primary/90 transition-colors"
        aria-label={lang === "es" ? "Buscar poemas" : "Search poems"}
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

      {/* Modal MD3 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          role="dialog"
          tabIndex={-1}
          onClick={handleOverlayClick}
        >
          <div className="bg-surface dark:bg-surfaceContainerHighest rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Cabecera */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-outlineVariant">
              <div className="flex items-center gap-2 text-sm text-onSurfaceVariant">
                <span>{lang === "es" ? "Idioma:" : "Language:"}</span>
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

            {/* Input */}
            <div className="px-6 py-4">
              <input
                id="search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  searchLang === "es" ? "Buscar poemas..." : "Search poems..."
                }
                className="w-full bg-surfaceContainer text-onSurfaceContainer rounded-md px-4 py-3 text-lg outline-none placeholder:text-onSurfaceVariant"
              />
            </div>

            {/* Resultados */}
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
                  {query
                    ? searchLang === "es"
                      ? "No se encontraron resultados"
                      : "No results found"
                    : searchLang === "es"
                    ? "Escribe para buscar poemas..."
                    : "Type to search poems..."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PoemSearch;
