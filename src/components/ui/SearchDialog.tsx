import React, { useState, useEffect, useCallback } from "react";
import type { Language } from "../../utils/i18n";
import { translations } from "../../utils/i18n";

interface SearchDialogProps {
  posts: SearchablePost[];
  lang: Language;
}

export interface SearchablePost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  language?: {
    code: string;
  };
  categories?: {
    nodes: Array<{
      name: string;
    }>;
  };
  tags?: {
    nodes: Array<{
      name: string;
    }>;
  };
}

const searchPosts = (
  posts: SearchablePost[],
  query: string,
  lang: string
): SearchablePost[] => {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);

  return posts
    .filter(
      (post) => !post.language || post.language.code.toLowerCase() === lang
    )
    .filter((post) => {
      const searchableText = [
        post.title,
        post.content.replace(/<[^>]*>/g, ""), // Remove HTML tags
        post.excerpt.replace(/<[^>]*>/g, ""),
        ...(post.categories?.nodes.map((cat) => cat.name) || []),
        ...(post.tags?.nodes.map((tag) => tag.name) || []),
      ]
        .join(" ")
        .toLowerCase();

      // Check if all search terms are present
      return terms.every((term) => searchableText.includes(term));
    })
    .slice(0, 10); // Limit results
};

const SearchDialog: React.FC<SearchDialogProps> = ({ posts = [], lang }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchLang, setSearchLang] = useState<Language>(lang);
  const [results, setResults] = useState<SearchablePost[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const t = translations[lang];

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
    // Add Ctrl+K or Cmd+K shortcut to open search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      setIsSearching(true);
      const searchResults = searchPosts(posts, query, searchLang);
      setResults(searchResults);
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [query, searchLang, posts]);

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        const input = document.getElementById(
          "search-input"
        ) as HTMLInputElement;
        input?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = "unset";
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const openModal = () => {
    setOpen(true);
    setQuery("");
    setResults([]);
  };

  const closeModal = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchLang(e.target.value as Language);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const highlightMatch = (text: string, query: string): string => {
    if (!query) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.replace(
      regex,
      '<mark class="bg-primary text-onPrimary px-1">$1</mark>'
    );
  };

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-primary text-onPrimary p-4 z-40 group brutal-border-primary brutal-shadow-primary"
        aria-label={t.search}
        title={`${t.search} (Ctrl+K)`}
      >
        <span className="icon-[streamline-sharp--definition-search-book-solid] text-2xl"></span>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-scrim/90 z-50 flex items-start justify-center p-4 pt-20"
          role="dialog"
          tabIndex={-1}
          onClick={handleOverlayClick}
        >
          <div className="bg-surfaceContainerHighest brutal-border w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b-3 border-outline">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-onSurfaceVariant font-mono">
                  <span>{t.language}:</span>
                  <select
                    value={searchLang}
                    onChange={handleLanguageChange}
                    className="bg-surfaceContainer text-onSurfaceContainer px-2 py-1 outline-none cursor-pointer brutal-border"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="text-xs text-onSurfaceVariant/70 font-mono">
                  Ctrl+K
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-2xl leading-none text-onSurfaceVariant hover:text-onSurface font-mono"
                aria-label="Close"
              >
                <span className="icon-[streamline-sharp--delete-2-solid] text-2xl"></span>
              </button>
            </div>

            <div className="px-6 py-4">
              <div className="relative">
                <input
                  id="search-input"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`${t.search} (mínimo 2 caracteres)`}
                  className="w-full bg-surfaceContainer text-onSurfaceContainer px-4 py-3 text-lg outline-none placeholder:text-onSurfaceVariant pr-10 brutal-border font-mono"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto border-t-3 border-outline">
              {query.length < 2 ? (
                <div className="p-6 text-center text-onSurfaceVariant">
                  <div className="mb-2 font-mono">
                    {lang === "es"
                      ? "Escribe al menos 2 caracteres para buscar"
                      : "Type at least 2 characters to search"}
                  </div>
                  <div className="text-xs opacity-70 font-sans">
                    {lang === "es"
                      ? "Puedes buscar por título, contenido, categorías o etiquetas"
                      : "You can search by title, content, categories, or tags"}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <ul className="p-2">
                  {results.map((post) => (
                    <li key={post.id}>
                      <a
                        href={`/${searchLang}/${post.slug}/`}
                        className="block px-4 py-3 hover:bg-surfaceContainerHighest brutal-border-primary brutal-shadow-hover m-2"
                        onClick={closeModal}
                      >
                        <div
                          className="font-medium text-onSurface group-hover:text-primary font-mono"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(post.title, query),
                          }}
                        />
                        {post.excerpt && (
                          <div
                            className="text-sm text-onSurfaceVariant mt-1 line-clamp-2 font-sans"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(
                                post.excerpt
                                  .replace(/<[^>]*>/g, "")
                                  .slice(0, 100) + "...",
                                query
                              ),
                            }}
                          />
                        )}
                        {(post.categories?.nodes.length ||
                          post.tags?.nodes.length) && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.categories?.nodes.slice(0, 2).map((cat) => (
                              <span
                                key={cat.name}
                                className="text-xs px-2 py-1 bg-primaryContainer text-onPrimaryContainer rounded-sm font-mono brutal-border"
                              >
                                {cat.name}
                              </span>
                            ))}
                            {post.tags?.nodes.slice(0, 3).map((tag) => (
                              <span
                                key={tag.name}
                                className="text-xs px-1.5 py-0.5 bg-surfaceVariant text-onSurfaceVariant rounded-sm font-mono brutal-border"
                              >
                                #{tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-onSurfaceVariant">
                  <div className="mb-2 font-mono">
                    {lang === "es"
                      ? "No se encontraron resultados"
                      : "No results found"}
                  </div>
                  <div className="text-xs opacity-70 font-sans">
                    {lang === "es"
                      ? "Intenta con diferentes palabras clave"
                      : "Try different keywords"}
                  </div>
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
