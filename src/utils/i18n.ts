export type Language = "es" | "en";

export const getLanguageFromRequest = (headers: Headers): Language => {
  return (headers.get("accept-language") || "").includes("es") ? "es" : "en";
};

export const translations = {
  es: {
    home: "Inicio",
    about: "Acerca",
    poems: "Poemas",
    archive: "Archivo",
    contact: "Contacto",
    search: "Buscar poemas...",
    noResults: "No se encontraron resultados",
    typeToSearch: "Escribe para buscar poemas...",
    language: "Idioma",
    alsoAvailable: "También disponible en inglés:",
    readTranslation: "Leer traducción",
    rights: "© 2025 Arawi Aura. Todos los derechos reservados.",
    quote: "La poesía está en la gente. Alaba a la gente. —Amanda Johnston",
    lightTheme: "Tema claro",
    darkTheme: "Tema oscuro",
    switchToLight: "Cambiar a tema claro",
    switchToDark: "Cambiar a tema oscuro",
  },
  en: {
    home: "Home",
    about: "About",
    poems: "Poems",
    archive: "Archive",
    contact: "Contact",
    search: "Search poems...",
    noResults: "No results found",
    typeToSearch: "Type to search poems...",
    language: "Language",
    alsoAvailable: "Also available in Spanish:",
    readTranslation: "Read translation",
    rights: "© 2025 Arawi Aura. All rights reserved.",
    quote: "Poetry is in the people. Praise the people. —Amanda Johnston",
    lightTheme: "Light theme",
    darkTheme: "Dark theme",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
};
