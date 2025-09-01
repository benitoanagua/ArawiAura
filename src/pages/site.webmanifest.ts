import type { APIRoute } from "astro";
import { MANIFEST_CONFIG } from "../utils/seo.constants";

export const GET: APIRoute = () => {
  const manifest = {
    name: MANIFEST_CONFIG.name,
    short_name: MANIFEST_CONFIG.short_name,
    description: MANIFEST_CONFIG.description,
    start_url: MANIFEST_CONFIG.start_url,
    display: MANIFEST_CONFIG.display,
    background_color: MANIFEST_CONFIG.background_color,
    theme_color: MANIFEST_CONFIG.theme_color,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
