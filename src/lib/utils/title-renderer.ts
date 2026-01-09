// Utilidad para renderizar títulos, equivalente al TitleRendererMixin

/**
 * Renderiza un título con el nivel de encabezado apropiado
 */
export function renderTitle(title: string, headingLevel: number = 4): string {
  const level = Math.max(1, Math.min(6, headingLevel));
  return `<h${level}>${escapeHtml(title)}</h${level}>`;
}

function escapeHtml(unsafe: string | undefined | null): string {
  if (unsafe === undefined || unsafe === null) return '';

  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Función auxiliar para usar en componentes Svelte para renderizar títulos
 */
export function createTitleRenderer(title: string, headingLevel: number = 4) {
  return {
    title,
    headingLevel,
    renderedTitle: renderTitle(title, headingLevel)
  };
}

/**
 * Renderiza un título como HTML seguro para usar con {@html}
 */
export function renderTitleHtml(title: string, headingLevel: number = 4): string {
  const level = Math.max(1, Math.min(6, headingLevel));
  return `<h${level} class="title-renderer__title">${escapeHtml(title)}</h${level}>`;
}