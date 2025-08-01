export default {
  extends: ["stylelint-config-standard", "stylelint-config-astro"],
  ignoreFiles: ["node_modules/**", "dist/**"],
  rules: {
    "import-notation": null, // allow @import "tailwindcss"
    "at-rule-empty-line-before": null, // ignore blank line before @layer
    "rule-empty-line-before": null, // ignore blank line before rules
  },
};
