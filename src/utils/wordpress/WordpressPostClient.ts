import { WordPressBaseClient } from "./WordpressBaseClient";
import type { WordPressPost, SearchablePost } from "../../types/wordpress";
import type { Language } from "../../utils/i18n";
import { cacheManager } from "../cache/CacheManager";

export class WordPressPostClient extends WordPressBaseClient {
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
  private readonly CACHE_KEYS = {
    POSTS_BY_LANGUAGE: (lang: Language) => `posts:${lang}`,
    POST_BY_SLUG: (slug: string, lang?: Language) =>
      lang ? `post:${slug}:${lang}` : `post:${slug}`,
    ALL_POSTS: "posts:all",
  };

  async getPosts(
    limit = 100,
    after?: string
  ): Promise<{
    posts: WordPressPost[];
    hasNextPage: boolean;
    endCursor?: string;
  }> {
    const cacheKey = this.CACHE_KEYS.ALL_POSTS + `:${limit}:${after || ""}`;
    const cached = cacheManager.get<{
      posts: WordPressPost[];
      hasNextPage: boolean;
      endCursor?: string;
    }>(cacheKey);

    if (cached) {
      return cached;
    }

    const query = `
      query GetPosts($first: Int, $after: String) {
        posts(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            title
            excerpt
            content
            date
            slug
            language {
              code
              name
            }
            translations {
              title
              slug
              language {
                code
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
              }
            }
            tags {
              nodes {
                name
              }
            }
          }
        }
      }
    `;

    const data = await this.query<{
      posts: {
        pageInfo: {
          hasNextPage: boolean;
          endCursor?: string;
        };
        nodes: WordPressPost[];
      };
    }>(query, { first: limit, after });

    const result = {
      posts: data.posts.nodes,
      hasNextPage: data.posts.pageInfo.hasNextPage,
      endCursor: data.posts.pageInfo.endCursor,
    };

    cacheManager.set(cacheKey, result, this.CACHE_DURATION);
    return result;
  }

  async getPostsByLanguage(
    language: Language,
    limit = 100
  ): Promise<WordPressPost[]> {
    const cacheKey = this.CACHE_KEYS.POSTS_BY_LANGUAGE(language) + `:${limit}`;
    const cached = cacheManager.get<WordPressPost[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const query = `
      query GetPostsByLanguage($language: LanguageCodeFilterEnum!, $first: Int) {
        posts(where: { language: $language }, first: $first) {
          nodes {
            id
            title
            excerpt
            content
            date
            slug
            language {
              code
              name
            }
            translations {
              title
              slug
              language {
                code
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `;

    const data = await this.query<{
      posts: {
        nodes: WordPressPost[];
      };
    }>(query, {
      language: language.toUpperCase(),
      first: limit,
    });

    cacheManager.set(cacheKey, data.posts.nodes, this.CACHE_DURATION);
    return data.posts.nodes;
  }

  async getPostBySlug(
    slug: string,
    language?: Language
  ): Promise<WordPressPost | null> {
    const cacheKey = this.CACHE_KEYS.POST_BY_SLUG(slug, language);
    const cached = cacheManager.get<WordPressPost>(cacheKey);

    if (cached) {
      return cached;
    }

    const query = `
      query GetPostBySlugAndLanguage($slug: String!, $language: LanguageCodeFilterEnum) {
        posts(where: { name: $slug, language: $language }, first: 1) {
          nodes {
            id
            title
            excerpt
            content
            date
            slug
            language {
              code
              name
            }
            translations {
              title
              slug
              language {
                code
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
              }
            }
            tags {
              nodes {
                name
              }
            }
          }
        }
      }
    `;

    const variables: any = { slug };
    if (language) {
      variables.language = language.toUpperCase();
    }

    const data = await this.query<{
      posts: {
        nodes: WordPressPost[];
      };
    }>(query, variables);

    const post = data.posts.nodes[0] || null;

    if (post) {
      cacheManager.set(cacheKey, post, this.CACHE_DURATION);
    }

    return post;
  }

  // Helper method to get translation slug for a post
  getTranslationSlug(post: WordPressPost, targetLang: Language): string | null {
    if (!post.translations || post.translations.length === 0) {
      return null;
    }

    const translation = post.translations.find(
      (t) => t.language.code.toLowerCase() === targetLang
    );

    return translation ? `${targetLang}/${translation.slug}` : null;
  }

  // Helper method to filter posts by language
  filterPostsByLanguage(
    posts: WordPressPost[],
    language: Language
  ): WordPressPost[] {
    return posts.filter(
      (post) => post.language?.code.toLowerCase() === language
    );
  }

  // Helper method to group posts by year and month
  groupPostsByDate(
    posts: WordPressPost[]
  ): Record<string, Record<string, WordPressPost[]>> {
    return posts.reduce((acc, post) => {
      const postDate = new Date(post.date);
      const year = postDate.getFullYear().toString();
      const month = (postDate.getMonth() + 1).toString().padStart(2, "0");

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];

      acc[year][month].push(post);

      return acc;
    }, {} as Record<string, Record<string, WordPressPost[]>>);
  }

  // Convert WordPressPost to SearchablePost
  toSearchablePost(post: WordPressPost): SearchablePost {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      language: post.language,
      categories: post.categories,
      tags: post.tags,
    };
  }

  // Método para invalidar cache específico - ACTUALIZADO
  invalidateCache(keyPattern: string | RegExp): number {
    return cacheManager.invalidateByPattern(keyPattern);
  }

  // Método para invalidar cache de posts por idioma
  invalidatePostsByLanguage(lang: Language): number {
    return this.invalidateCache(`posts:${lang}`);
  }

  // Método para invalidar cache de un post específico
  invalidatePostBySlug(slug: string, lang?: Language): number {
    const pattern = lang ? `post:${slug}:${lang}` : `post:${slug}`;
    return this.invalidateCache(pattern);
  }

  // Método para invalidar todo el cache de posts
  invalidateAllPosts(): number {
    return this.invalidateCache(/^posts:/);
  }

  // Método para obtener estadísticas del cache
  getCacheStats() {
    return cacheManager.getStats();
  }

  // Método para limpiar items expirados
  cleanupExpiredCache(): number {
    return cacheManager.cleanupExpired();
  }
}
