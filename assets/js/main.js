// Main JavaScript file for Arawi Aura Poetry Blog
// Comprehensive Typography.js implementation for detailed typographic control

// Import Typography.js library
import Typography from "https://unpkg.com/typography@0.16.19/dist/index.js";

// Advanced typography configuration for literary content
const typography = new Typography({
  // Base typography settings
  baseFontSize: "18px",
  baseLineHeight: 1.65,
  scaleRatio: 2.0, // More conservative scaling for better readability

  // Font family configurations
  headerFontFamily: [
    "Source Serif Pro",
    "Crimson Text",
    "Libre Baskerville",
    "Times New Roman",
    "serif",
  ],
  bodyFontFamily: [
    "Source Sans Pro",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],

  // Color scheme
  headerColor: "#2c3e50", // Darker for better contrast
  bodyColor: "#34495e", // Slightly softer than pure black
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 700,

  // Google Fonts configuration with comprehensive weights
  googleFonts: [
    {
      name: "Source Sans Pro",
      styles: ["200", "300", "400", "500", "600", "700", "800", "900"],
    },
    {
      name: "Source Serif Pro",
      styles: ["200", "300", "400", "500", "600", "700", "800", "900"],
    },
    {
      name: "Source Code Pro",
      styles: ["200", "300", "400", "500", "600", "700", "800", "900"],
    },
  ],

  // Include normalize CSS for consistent cross-browser rendering
  includeNormalize: true,

  // Comprehensive override styles for literary content
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => {
    const linkColor = "#3498db";
    const linkHoverColor = "#2980b9";

    return {
      // Enhanced heading styles with proper hierarchy
      h1: {
        fontSize: adjustFontSizeTo("48px").fontSize,
        fontFamily: options.headerFontFamily.join(","),
        fontWeight: 700,
        lineHeight: 1.1,
        marginTop: rhythm(2),
        marginBottom: rhythm(1),
        color: options.headerColor,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: adjustFontSizeTo("36px").fontSize,
        fontFamily: options.headerFontFamily.join(","),
        fontWeight: 600,
        lineHeight: 1.15,
        marginTop: rhythm(1.5),
        marginBottom: rhythm(0.75),
        color: options.headerColor,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontSize: adjustFontSizeTo("28px").fontSize,
        fontFamily: options.headerFontFamily.join(","),
        fontWeight: 600,
        lineHeight: 1.2,
        marginTop: rhythm(1.25),
        marginBottom: rhythm(0.5),
        color: options.headerColor,
      },
      h4: {
        fontSize: adjustFontSizeTo("24px").fontSize,
        fontFamily: options.headerFontFamily.join(","),
        fontWeight: 600,
        lineHeight: 1.25,
        marginTop: rhythm(1),
        marginBottom: rhythm(0.5),
        color: options.headerColor,
      },
      h5: {
        fontSize: adjustFontSizeTo("20px").fontSize,
        fontFamily: options.headerFontFamily.join(","),
        fontWeight: 500,
        lineHeight: 1.3,
        marginTop: rhythm(0.75),
        marginBottom: rhythm(0.5),
        color: options.headerColor,
      },
      h6: {
        fontSize: adjustFontSizeTo("16px").fontSize,
        fontFamily: options.headerFontFamily.join(","),
        fontWeight: 500,
        lineHeight: 1.35,
        marginTop: rhythm(0.5),
        marginBottom: rhythm(0.5),
        color: options.headerColor,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },

      // Body text and paragraph styling
      p: {
        marginBottom: rhythm(1),
        lineHeight: 1.65,
        textAlign: "justify",
        textJustify: "inter-word",
        hyphens: "auto",
        wordBreak: "break-word",
      },

      // Enhanced blockquote styling for poetry
      blockquote: {
        fontFamily: options.headerFontFamily.join(","),
        fontStyle: "italic",
        fontWeight: 400,
        borderLeft: `4px solid ${linkColor}`,
        paddingLeft: rhythm(1.5),
        margin: `${rhythm(2)} 0`,
        color: "#5a6c7d",
        backgroundColor: "#f8f9fa",
        padding: `${rhythm(1)} ${rhythm(1.5)}`,
        borderRadius: "0 4px 4px 0",
        position: "relative",
      },
      "blockquote:before": {
        content: '"\\201C"',
        fontSize: "3em",
        lineHeight: 0.1,
        marginRight: "0.25em",
        verticalAlign: "-0.4em",
        color: linkColor,
        opacity: 0.3,
      },
      "blockquote p": {
        display: "inline",
        marginBottom: 0,
      },
      "blockquote p:last-child": {
        marginBottom: 0,
      },

      // Link styling with smooth transitions
      a: {
        color: linkColor,
        textDecoration: "none",
        transition: "all 0.2s ease-in-out",
        borderBottom: "1px solid transparent",
      },
      "a:hover": {
        color: linkHoverColor,
        borderBottomColor: linkHoverColor,
        textDecoration: "none",
      },
      "a:focus": {
        outline: `2px solid ${linkColor}`,
        outlineOffset: "2px",
      },

      // List styling
      "ul, ol": {
        margin: `${rhythm(1)} 0`,
        paddingLeft: rhythm(2),
      },
      li: {
        marginBottom: rhythm(0.5),
        lineHeight: 1.6,
      },
      "li > ul, li > ol": {
        marginTop: rhythm(0.5),
        marginBottom: 0,
      },

      // Code styling for any technical content
      code: {
        fontFamily: '"Source Code Pro", "Monaco", "Consolas", monospace',
        backgroundColor: "#f1f3f4",
        color: "#d73a49",
        padding: "0.125rem 0.25rem",
        borderRadius: "3px",
        fontSize: "0.9em",
        fontWeight: 500,
        letterSpacing: "-0.02em",
      },
      pre: {
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
        borderRadius: "6px",
        padding: rhythm(1.5),
        overflowX: "auto",
        margin: `${rhythm(1.5)} 0`,
        fontSize: "0.9em",
        lineHeight: 1.45,
        position: "relative",
      },
      "pre code": {
        backgroundColor: "transparent",
        color: "inherit",
        padding: 0,
        fontSize: "inherit",
      },

      // Table styling for any data presentation
      table: {
        width: "100%",
        borderCollapse: "collapse",
        margin: `${rhythm(1)} 0`,
      },
      "th, td": {
        padding: `${rhythm(0.5)} ${rhythm(0.75)}`,
        borderBottom: "1px solid #e9ecef",
        textAlign: "left",
      },
      th: {
        fontWeight: 600,
        backgroundColor: "#f8f9fa",
        borderTop: "2px solid #dee2e6",
      },

      // Form elements (if needed)
      "input, textarea, select": {
        fontFamily: options.bodyFontFamily.join(","),
        fontSize: "1rem",
        lineHeight: 1.5,
        padding: "0.5rem",
        border: "1px solid #ced4da",
        borderRadius: "4px",
      },
      "input:focus, textarea:focus, select:focus": {
        outline: "none",
        borderColor: linkColor,
        boxShadow: `0 0 0 2px ${linkColor}25`,
      },

      // Image styling
      img: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "4px",
      },

      // Horizontal rule
      hr: {
        border: "none",
        borderTop: "1px solid #e9ecef",
        margin: `${rhythm(2)} 0`,
      },

      // Strong and emphasis
      strong: {
        fontWeight: 700,
        color: options.headerColor,
      },
      em: {
        fontStyle: "italic",
        color: "#5a6c7d",
      },

      // Small text
      small: {
        fontSize: "0.875em",
        color: "#6c757d",
      },

      // Subscript and superscript
      sub: {
        fontSize: "0.75em",
        verticalAlign: "sub",
      },
      sup: {
        fontSize: "0.75em",
        verticalAlign: "super",
      },

      // Abbreviations
      abbr: {
        borderBottom: "1px dotted #6c757d",
        cursor: "help",
      },

      // Selection styling
      "::selection": {
        backgroundColor: `${linkColor}40`,
        color: options.headerColor,
      },
      "::-moz-selection": {
        backgroundColor: `${linkColor}40`,
        color: options.headerColor,
      },
    };
  },

  // Override theme styles for specific elements
  overrideThemeStyles: ({ rhythm }, options) => ({
    // Custom spacing for specific content types
    ".poem-content": {
      fontSize: "1.1em",
      lineHeight: 1.8,
      marginBottom: rhythm(2),
    },
    ".poem-title": {
      fontSize: "1.5em",
      marginBottom: rhythm(1),
    },
    ".poem-meta": {
      fontSize: "0.9em",
      color: "#6c757d",
      marginBottom: rhythm(0.5),
    },
  }),
});

// Inject the generated CSS into the page
function injectTypographyStyles() {
  const styleElement = document.getElementById("typography-styles");
  if (styleElement) {
    try {
      styleElement.textContent = typography.toString();
      console.log("Typography.js styles injected successfully");
    } catch (error) {
      console.error("Failed to inject Typography.js styles:", error);
      // Fallback to basic styles if Typography.js fails
      styleElement.textContent = `
        body { font-family: 'Source Sans Pro', sans-serif; font-size: 18px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Source Serif Pro', serif; }
      `;
    }
  } else {
    console.warn("Typography styles element not found");
  }
}

// Initialize typography when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectTypographyStyles);
} else {
  injectTypographyStyles();
}

// Export typography instance for potential use in other scripts
window.typography = typography;

// Log successful initialization
console.log(
  "Arawi Aura Poetry Blog - Typography.js initialized with comprehensive configuration"
);
console.log("Typography scale ratio:", typography.options.scaleRatio);
console.log("Base font size:", typography.options.baseFontSize);
console.log("Line height:", typography.options.baseLineHeight);
