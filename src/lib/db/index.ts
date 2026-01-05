/**
 * Barrel export para todas las funciones de base de datos
 * Siguiendo las convenciones de SvelteKit
 */

// Conexión
export { initDB, getDB, closeDB } from './connection.js';

// Queries
export * from './queries.js';

// Tipos
export type * from './types.js';

// Seed/Inicialización
export { initializeDatabase, runSchema, seedDevelopmentData, checkConnection } from './seed.js';