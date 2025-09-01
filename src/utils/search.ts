import type { CollectionEntry } from "astro:content";

export interface SearchResult {
  slug: string;
  title: string;
  lang: string;
  body: string;
}

export const searchPoems = (
  poems: SearchResult[],
  query: string,
  lang: string
): SearchResult[] => {
  if (!query) return [];

  const q = query.toLowerCase();
  return poems
    .filter((p) => p.lang === lang)
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
    )
    .slice(0, 10);
};
