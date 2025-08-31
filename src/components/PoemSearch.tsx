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
      {/* Botón flotante */}
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-stone-900 text-white rounded-full p-3 shadow-lg z-40 hover:bg-stone-800 transition-colors"
        aria-label={lang === "es" ? "Buscar poemas" : "Search poems"}
      >
        🔍
      </button>

      {/* Modal */}
      {open && (
        <div
          className={`fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          role="dialog"
          tabIndex={-1}
          onClick={handleOverlayClick}
        >
          <div
            className={`bg-white dark:bg-stone-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-transform duration-200 ${
              open ? "scale-100" : "scale-95"
            }`}
          >
            {/* Cabecera */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <span>{lang === "es" ? "Idioma:" : "Language:"}</span>
                <select
                  value={searchLang}
                  onChange={handleLanguageChange}
                  className="bg-transparent border-none outline-none cursor-pointer dark:text-white"
                >
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                </select>
              </div>
              <button
                onClick={closeModal}
                className="text-2xl leading-none text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Input */}
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchLang === "es" ? "Buscar…" : "Search…"}
              className="w-full bg-transparent px-4 py-3 text-lg outline-none dark:text-white"
            />

            {/* Resultados */}
            <ul className="max-h-80 overflow-y-auto p-4 space-y-2">
              {results.length > 0 ? (
                results.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={`/${p.slug}/`}
                      className="block hover:bg-stone-100 dark:hover:bg-stone-700 p-2 rounded transition-colors"
                      onClick={closeModal}
                    >
                      {p.title}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-center text-stone-400">
                  {query
                    ? searchLang === "es"
                      ? "Sin resultados"
                      : "No results"
                    : searchLang === "es"
                    ? "Empieza a escribir…"
                    : "Start typing…"}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PoemSearch;
