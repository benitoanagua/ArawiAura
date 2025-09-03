import { WordPressBaseClient } from "./WordpressBaseClient";
import type { WordPressPage } from "../../types/wordpress";

export class WordPressPageClient extends WordPressBaseClient {
  async getPages(limit = 10): Promise<WordPressPage[]> {
    const query = `
      query GetPages($first: Int) {
        pages(first: $first) {
          nodes {
            id
            title
            slug
            content
            date
            status
          }
        }
      }
    `;

    const data = await this.query<{
      pages: {
        nodes: WordPressPage[];
      };
    }>(query, { first: limit });

    return data.pages.nodes;
  }
}
