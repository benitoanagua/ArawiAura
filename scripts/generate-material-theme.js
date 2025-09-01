import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import {
  themeFromSourceColor,
  argbFromHex,
  hexFromArgb,
  DynamicScheme,
} from "@material/material-color-utilities";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "../src/styles");

const themeConfig = {
  seedColor: "#bb3813",
  variant: "tonalSpot",
  contrastLevel: 0,
};

function generateOptimizedTheme() {
  const sourceColorArgb = argbFromHex(themeConfig.seedColor);
  const theme = themeFromSourceColor(sourceColorArgb);

  const options = {
    sourceColorArgb,
    variant: themeConfig.variant,
    contrastLevel: themeConfig.contrastLevel,
    primaryPalette: theme.palettes.primary,
    secondaryPalette: theme.palettes.secondary,
    tertiaryPalette: theme.palettes.tertiary,
    neutralPalette: theme.palettes.neutral,
    neutralVariantPalette: theme.palettes.neutralVariant,
  };

  const lightScheme = new DynamicScheme({ ...options, isDark: false });
  const darkScheme = new DynamicScheme({ ...options, isDark: true });

  const extractColors = (scheme) => {
    const props = [
      "primary",
      "onPrimary",
      "primaryContainer",
      "onPrimaryContainer",
      "secondary",
      "onSecondary",
      "secondaryContainer",
      "onSecondaryContainer",
      "tertiary",
      "onTertiary",
      "tertiaryContainer",
      "onTertiaryContainer",
      "error",
      "onError",
      "errorContainer",
      "onErrorContainer",
      "background",
      "onBackground",
      "surface",
      "surfaceDim",
      "surfaceBright",
      "surfaceContainerLowest",
      "surfaceContainerLow",
      "surfaceContainer",
      "surfaceContainerHigh",
      "surfaceContainerHighest",
      "onSurface",
      "surfaceVariant",
      "onSurfaceVariant",
      "inverseSurface",
      "inverseOnSurface",
      "outline",
      "outlineVariant",
      "shadow",
      "scrim",
      "surfaceTint",
      "inversePrimary",
      "primaryFixed",
      "primaryFixedDim",
      "onPrimaryFixed",
      "onPrimaryFixedVariant",
      "secondaryFixed",
      "secondaryFixedDim",
      "onSecondaryFixed",
      "onSecondaryFixedVariant",
      "tertiaryFixed",
      "tertiaryFixedDim",
      "onTertiaryFixed",
      "onTertiaryFixedVariant",
    ];

    return props.reduce((acc, prop) => {
      try {
        acc[prop] = hexFromArgb(scheme[prop]);
      } catch {}
      return acc;
    }, {});
  };

  const lightColors = extractColors(lightScheme);
  const darkColors = extractColors(darkScheme);

  // CSS con soporte para tema automático y manual usando data-theme
  const cssContent = `/* Generated Material Design 3 Theme - Auto & Manual */
@theme {
  /* Tema claro por defecto */
${Object.entries(lightColors)
  .map(([k, v]) => `  --color-${k}: ${v};`)
  .join("\n")}
}

@media (prefers-color-scheme: dark) {
  @theme {
    /* Tema oscuro automático */
${Object.entries(darkColors)
  .map(([k, v]) => `    --color-${k}: ${v};`)
  .join("\n")}
  }
}

/* Tema claro manual (sobrescribe media queries) */
[data-theme="light"] {
${Object.entries(lightColors)
  .map(([k, v]) => `  --color-${k}: ${v} !important;`)
  .join("\n")}
}

/* Tema oscuro manual (sobrescribe media queries) */
[data-theme="dark"] {
${Object.entries(darkColors)
  .map(([k, v]) => `  --color-${k}: ${v} !important;`)
  .join("\n")}
}

/* Asegurar que los temas manuales tengan prioridad */
[data-theme="light"],
[data-theme="dark"] {
  color-scheme: normal;
}

@media (prefers-color-scheme: dark) {
  [data-theme="light"] {
    /* Forzar tema claro incluso en modo oscuro del sistema */
${Object.entries(lightColors)
  .map(([k, v]) => `    --color-${k}: ${v} !important;`)
  .join("\n")}
  }
}

@media (prefers-color-scheme: light) {
  [data-theme="dark"] {
    /* Forzar tema oscuro incluso en modo claro del sistema */
${Object.entries(darkColors)
  .map(([k, v]) => `    --color-${k}: ${v} !important;`)
  .join("\n")}
  }
}`;

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(`${outputDir}/material-tokens.css`, cssContent);
  console.log(
    "✅ Tema con soporte manual generado: src/styles/material-tokens.css"
  );
}

generateOptimizedTheme();
