/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WORDPRESS_GRAPHQL_URL: string;
  readonly SITE_URL: string;
  readonly WORDPRESS_AUTH_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
