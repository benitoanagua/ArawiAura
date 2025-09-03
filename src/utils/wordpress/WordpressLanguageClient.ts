import { WordPressBaseClient } from "./WordpressBaseClient";

export class WordPressLanguageClient extends WordPressBaseClient {
  async getAvailableLanguages(): Promise<
    Array<{
      code: string;
      name: string;
      slug: string;
      locale: string;
    }>
  > {
    const query = `
      query GetLanguages {
        languages {
          code
          name
          slug
          locale
        }
      }
    `;

    const data = await this.query<{
      languages: Array<{
        code: string;
        name: string;
        slug: string;
        locale: string;
      }>;
    }>(query);

    return data.languages;
  }
}
