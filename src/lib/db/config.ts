import { config } from 'dotenv';

// Cargar variables de entorno
config();

// Configuración de la conexión a SurrealDB desde variables de entorno
export const DB_CONFIG = {
	URL: process.env.SURREALDB_URL!,
	NAMESPACE: process.env.SURREALDB_NAMESPACE!,
	DATABASE: process.env.SURREALDB_DATABASE!,
	USERNAME: process.env.SURREALDB_USERNAME!,
	PASSWORD: process.env.SURREALDB_PASSWORD!
};