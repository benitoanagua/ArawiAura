/**
 * Barrel export para todas las funciones de base de datos
 * Siguiendo las convenciones de SvelteKit
 */

// Conexión
export { initDB, getDB, closeDB } from './connection.js';

// Queries - Posts
export * from './posts.js';

// Queries - Tags
export * from './tags.js';

// Queries - Users
export * from './users.js';

// Queries - Settings
export * from './settings.js';

// Legacy queries file has been deleted - using modular structure

// Tipos
export type * from './types.js';

// Seed/Inicialización
export { initializeDatabase, runSchema, seedDevelopmentData, checkConnection } from './seed.js';