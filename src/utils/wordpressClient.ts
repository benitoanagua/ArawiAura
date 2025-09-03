import { WordPressPostClient } from "./wordpress/WordpressPostClient";
import { WordPressPageClient } from "./wordpress/WordpressPageClient";
import { WordPressLanguageClient } from "./wordpress/WordpressLanguageClient";
import type {
  WordPressPost,
  WordPressPage,
  SearchablePost,
} from "../types/wordpress";
import type { Language } from "./i18n";

// Export all types
export type { WordPressPost, WordPressPage, SearchablePost };

// Main client class that composes all sub-clients
class WordPressClient {
  private postClient: WordPressPostClient;
  private pageClient: WordPressPageClient;
  private languageClient: WordPressLanguageClient;

  constructor() {
    this.postClient = new WordPressPostClient();
    this.pageClient = new WordPressPageClient();
    this.languageClient = new WordPressLanguageClient();
  }

  // Post methods
  getPosts(limit?: number, after?: string) {
    return this.postClient.getPosts(limit, after);
  }

  getPostsByLanguage(language: Language, limit?: number) {
    return this.postClient.getPostsByLanguage(language, limit);
  }

  getPostBySlug(slug: string, language?: Language) {
    return this.postClient.getPostBySlug(slug, language);
  }

  getTranslationSlug(post: WordPressPost, targetLang: Language) {
    return this.postClient.getTranslationSlug(post, targetLang);
  }

  filterPostsByLanguage(posts: WordPressPost[], language: Language) {
    return this.postClient.filterPostsByLanguage(posts, language);
  }

  groupPostsByDate(posts: WordPressPost[]) {
    return this.postClient.groupPostsByDate(posts);
  }

  toSearchablePost(post: WordPressPost) {
    return this.postClient.toSearchablePost(post);
  }

  async getPostWithTranslationHandling(
    slug: string,
    requestedLang: Language
  ): Promise<{
    post: WordPressPost | null;
    shouldRedirect: boolean;
    redirectTo?: string;
  }> {
    // Primero intentar obtener el post en el idioma solicitado
    const post = await this.getPostBySlug(slug, requestedLang);

    if (post) {
      return { post, shouldRedirect: false };
    }

    // Si no se encuentra en el idioma solicitado, buscar en cualquier idioma
    const fallbackPost = await this.getPostBySlug(slug);

    if (!fallbackPost) {
      return { post: null, shouldRedirect: false };
    }

    // Verificar si el post tiene una traducción al idioma solicitado
    const currentLang = fallbackPost.language?.code.toLowerCase();
    if (currentLang !== requestedLang) {
      const translation = fallbackPost.translations?.find(
        (t) => t.language.code.toLowerCase() === requestedLang
      );

      if (translation) {
        return {
          post: null,
          shouldRedirect: true,
          redirectTo: `/${requestedLang}/${translation.slug}/`,
        };
      }
    }

    // Si no hay traducción pero el post existe, devolver el post encontrado
    return { post: fallbackPost, shouldRedirect: false };
  }

  // Page methods
  getPages(limit?: number) {
    return this.pageClient.getPages(limit);
  }

  // Language methods
  getAvailableLanguages() {
    return this.languageClient.getAvailableLanguages();
  }
}

// Export singleton instance
export const wordpressClient = new WordPressClient();

// Legacy functions for backward compatibility
export const fetchWordPressPosts = (
  lang: Language
): Promise<WordPressPost[]> => {
  return wordpressClient.getPostsByLanguage(lang);
};

export const fetchWordPressPost = (
  slug: string,
  lang: Language
): Promise<WordPressPost | null> => {
  return wordpressClient.getPostBySlug(slug, lang);
};
