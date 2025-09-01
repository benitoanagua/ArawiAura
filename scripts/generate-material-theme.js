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
  seedColor: "#c39c6c",
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

  // CSS optimizado sin duplicaciones
  const cssContent = `/* Generated Material Design 3 Theme */
@theme {
${Object.entries(lightColors)
  .map(([k, v]) => `  --color-${k}: ${v};`)
  .join("\n")}
}

@media (prefers-color-scheme: dark) {
  @theme {
${Object.entries(darkColors)
  .map(([k, v]) => `    --color-${k}: ${v};`)
  .join("\n")}
  }
}`;

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(`${outputDir}/material-theme.css`, cssContent);
  console.log("✅ Tema optimizado generado: src/styles/material-theme.css");
}

generateOptimizedTheme();
