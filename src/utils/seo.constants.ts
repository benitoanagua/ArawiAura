import type { Language } from "./i18n";

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  image: string;
  siteName: string;
  twitterHandle: string;
  locale: string;
}

export const BASE_SEO_CONFIG: Record<Language, SEOConfig> = {
  en: {
    title: "Arawi Aura - Poetry Journal",
    description:
      "A personal poetry journal kept since 2017. Explore poems in English and Spanish with precise syllable analysis and pattern validation.",
    keywords:
      "poetry, poems, haiku, tanka, cinquain, limerick, syllable counter, poetry analysis, multilingual poetry, Spanish poems, English poems",
    image: "/images/og-image.jpg",
    siteName: "Arawi Aura",
    twitterHandle: "@arawi_aura",
    locale: "en_US",
  },
  es: {
    title: "Arawi Aura - Diario de Poesía",
    description:
      "Un diario personal de poesía mantenido desde 2017. Explora poemas en español e inglés con análisis preciso de sílabas y validación de patrones.",
    keywords:
      "poesía, poemas, haiku, tanka, cinquain, limerick, contador de sílabas, análisis poético, poesía multilingüe, poemas españoles, poemas ingleses",
    image: "/images/og-image.jpg",
    siteName: "Arawi Aura",
    twitterHandle: "@arawi_aura",
    locale: "es_ES",
  },
};

// Nuevas constantes para el manifest (no dependen del idioma)
export const MANIFEST_CONFIG = {
  name: "Arawi Aura",
  short_name: "ArawiAura",
  description: "A personal poetry journal in English and Spanish",
  start_url: "/",
  display: "standalone",
  background_color: "#fff8f4",
  theme_color: "#bb3813",
} as const;

export const WEBSITE_URL = "https://arawi-aura.dev";

// Array de redes sociales del autor
export const AUTHOR_SOCIAL_LINKS = [
  {
    url: "https://benitoanagua.me",
    title: "Personal Website",
  },
  {
    url: "https://linkedin.com/in/benito-anagua",
    title: "LinkedIn",
  },
  {
    url: "https://github.com/benitoanagua",
    title: "GitHub",
  },
  {
    url: "https://gitlab.com/benito.anagua",
    title: "GitLab",
  },
  {
    url: "https://behance.net/benitoanagua",
    title: "Behance",
  },
] as const;

// Función para generar metadatos SEO completos
export const generateSeoMetadata = (
  lang: Language,
  pageTitle?: string,
  pageDescription?: string,
  pageImage?: string
) => {
  const baseConfig = BASE_SEO_CONFIG[lang];
  const title = pageTitle
    ? `${pageTitle} | ${baseConfig.siteName}`
    : baseConfig.title;
  const description = pageDescription || baseConfig.description;
  const image = pageImage || baseConfig.image;
  const fullImageUrl = `${WEBSITE_URL}${image}`;

  return {
    title,
    description,
    image: fullImageUrl,
    keywords: baseConfig.keywords,
    siteName: baseConfig.siteName,
    twitterHandle: baseConfig.twitterHandle,
    locale: baseConfig.locale,
    url: WEBSITE_URL,
  };
};
