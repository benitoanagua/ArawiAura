import { defineCollection, z } from "astro:content";

const poems = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  poems,
};
