import { WordPressBaseClient } from "./WordpressBaseClient";
import type { WordPressPost, SearchablePost } from "../../types/wordpress";
import type { Language } from "../../utils/i18n";

export class WordPressPostClient extends WordPressBaseClient {
  async getPosts(
    limit = 100,
    after?: string
  ): Promise<{
    posts: WordPressPost[];
    hasNextPage: boolean;
    endCursor?: string;
  }> {
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

    return {
      posts: data.posts.nodes,
      hasNextPage: data.posts.pageInfo.hasNextPage,
      endCursor: data.posts.pageInfo.endCursor,
    };
  }

  async getPostsByLanguage(
    language: Language,
    limit = 100
  ): Promise<WordPressPost[]> {
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

    return data.posts.nodes;
  }

  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const query = `
      query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
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
    `;

    const data = await this.query<{
      post: WordPressPost | null;
    }>(query, { slug });

    return data.post;
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
}
