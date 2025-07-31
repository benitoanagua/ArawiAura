import { defineCollection, z } from "astro:content";

const poems = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lang: z.enum(["es", "en"]),
    translation: z.string().optional(), // slug del poema en otro idioma
    draft: z.boolean().default(false),
  }),
});

export const collections = { poems };
