import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import {
  argbFromHex,
  hexFromArgb,
  MaterialDynamicColors,
  Hct,
  SchemeTonalSpot,
  SchemeNeutral,
  SchemeVibrant,
  SchemeExpressive,
  SchemeMonochrome,
  SchemeContent,
  SchemeFidelity,
} from "@material/material-color-utilities";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "../src/styles");

// Configuración del tema
const themeConfig = {
  seedColor: "#bb3813",
  variant: "CONTENT",
  contrastLevel: 1,
};

// Mapeo de variantes a constructores de esquema
const SCHEME_CONSTRUCTORS = {
  TONAL_SPOT: SchemeTonalSpot,
  NEUTRAL: SchemeNeutral,
  VIBRANT: SchemeVibrant,
  EXPRESSIVE: SchemeExpressive,
  MONOCHROME: SchemeMonochrome,
  CONTENT: SchemeContent,
  FIDELITY: SchemeFidelity,
};

function createScheme(isDark) {
  const sourceColor = argbFromHex(themeConfig.seedColor);
  const sourceHct = Hct.fromInt(sourceColor);
  const SchemeConstructor =
    SCHEME_CONSTRUCTORS[themeConfig.variant] || SchemeTonalSpot;
  return new SchemeConstructor(sourceHct, isDark, themeConfig.contrastLevel);
}

function extractColors(scheme) {
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
    "outline",
    "outlineVariant",
    "shadow",
    "scrim",
    "inverseSurface",
    "inverseOnSurface",
    "inversePrimary",
  ];

  const colors = {};
  for (const prop of props) {
    try {
      const color = MaterialDynamicColors[prop]?.getArgb(scheme);
      colors[prop] = hexFromArgb(color);
    } catch {
      colors[prop] = "#FF00FF"; // fallback
    }
  }
  return colors;
}

function generateTheme() {
  const lightScheme = createScheme(false);
  const darkScheme = createScheme(true);

  const lightColors = extractColors(lightScheme);
  const darkColors = extractColors(darkScheme);

  const cssContent = `@theme {
${Object.entries(lightColors)
  .map(([k, v]) => `  --color-${k}: ${v};`)
  .join("\n")}
}

[data-theme="dark"] {
${Object.entries(darkColors)
  .map(([k, v]) => `  --color-${k}: ${v};`)
  .join("\n")}
}`;

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(`${outputDir}/material-tokens.css`, cssContent);
  console.log("✅ Tokens generados en src/styles/material-tokens.css");
}

generateTheme();
