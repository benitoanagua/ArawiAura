import { getEnvConfig } from "../../config/env";

export abstract class WordPressBaseClient {
  protected readonly WORDPRESS_GRAPHQL_URL: string;

  constructor() {
    const config = getEnvConfig();
    this.WORDPRESS_GRAPHQL_URL = config.WORDPRESS_GRAPHQL_URL;
  }

  protected async query<T>(
    query: string,
    variables?: Record<string, any>
  ): Promise<T> {
    try {
      const config = getEnvConfig();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Add authentication if available
      if (config.WORDPRESS_AUTH_TOKEN) {
        headers["Authorization"] = `Bearer ${config.WORDPRESS_AUTH_TOKEN}`;
      }

      const response = await fetch(this.WORDPRESS_GRAPHQL_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query,
          variables: variables || {},
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } catch (error) {
      console.error("Error querying WordPress:", error);
      throw error;
    }
  }
}
