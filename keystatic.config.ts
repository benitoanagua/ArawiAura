import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    poems: collection({
      label: "Poems",
      slugField: "title",
      path: "src/content/poems/**",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true },
          },
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
        }),
        lang: fields.select({
          label: "Language",
          options: [
            { label: "Spanish", value: "es" },
            { label: "English", value: "en" },
          ],
          defaultValue: "es",
        }),
        translation: fields.text({
          label: "Translation slug",
          description:
            "Full slug of the translation (e.g., 'es/2025/07/titulo')",
        }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/poems",
              publicPath: "/images/poems/",
            },
          },
        }),
      },
    }),
  },
  ui: {
    brand: { name: "Arawi Aura CMS" },
    // navigation: {
    //   Poems: ["poems"],
    // },
  },
});
