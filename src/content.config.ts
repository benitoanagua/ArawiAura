import { defineCollection, z } from "astro:content";

const poems = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lang: z.enum(["es", "en"]),
    translation: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { poems };
