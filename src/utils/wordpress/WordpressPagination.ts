import { wordpressClient } from "../wordpressClient";
import type { WordPressPost } from "../../types/wordpress";
import type { Language } from "../../utils/i18n";

export class WordPressPagination {
  private readonly PAGE_SIZE = 10;

  async getPaginatedPosts(
    page: number = 1,
    language?: Language,
    category?: string
  ): Promise<{
    posts: WordPressPost[];
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    // Obtener todos los posts y luego paginar localmente
    // (Esta es una solución simple, pero no es óptima para muchos posts)
    const allPosts = await wordpressClient.getPostsByLanguage(
      language || "en",
      1000
    );

    // Filtrar por categoría si se especifica
    let filteredPosts = allPosts;
    if (category) {
      filteredPosts = allPosts.filter((post) =>
        post.categories?.nodes.some((cat) => cat.slug === category)
      );
    }

    // Calcular paginación
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / this.PAGE_SIZE);
    const startIndex = (page - 1) * this.PAGE_SIZE;
    const endIndex = startIndex + this.PAGE_SIZE;

    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      currentPage: page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  // Método alternativo usando GraphQL directo (si necesitas exponer query)
  async getPaginatedPostsGraphQL(
    page: number = 1,
    language?: Language,
    category?: string
  ): Promise<{
    posts: WordPressPost[];
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    // Mensaje de error más informativo que incluye los parámetros
    throw new Error(
      `Método no implementado. Parámetros recibidos: page=${page}, language=${language}, category=${category}. Usa getPaginatedPosts en su lugar.`
    );
  }
}

export const wordpressPagination = new WordPressPagination();
