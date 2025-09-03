export interface EnvConfig {
  WORDPRESS_GRAPHQL_URL: string;
  SITE_URL: string;
  WORDPRESS_AUTH_TOKEN?: string;
}

export const getEnvConfig = (): EnvConfig => {
  const WORDPRESS_GRAPHQL_URL = import.meta.env.WORDPRESS_GRAPHQL_URL;
  const SITE_URL = import.meta.env.SITE_URL;
  const WORDPRESS_AUTH_TOKEN = import.meta.env.WORDPRESS_AUTH_TOKEN;

  // Validar que las variables requeridas estén presentes
  if (!WORDPRESS_GRAPHQL_URL) {
    throw new Error(
      "WORDPRESS_GRAPHQL_URL is required in environment variables"
    );
  }

  if (!SITE_URL) {
    throw new Error("SITE_URL is required in environment variables");
  }

  return {
    WORDPRESS_GRAPHQL_URL,
    SITE_URL,
    WORDPRESS_AUTH_TOKEN,
  };
};
