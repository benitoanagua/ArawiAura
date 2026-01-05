import { Surreal } from 'surrealdb';

// Configuración de la conexión a SurrealDB desde variables de entorno
const DB_URL = process.env.SURREALDB_URL!;
const DB_NAMESPACE = process.env.SURREALDB_NAMESPACE!;
const DB_DATABASE = process.env.SURREALDB_DATABASE!;
const DB_USERNAME = process.env.SURREALDB_USERNAME!;
const DB_PASSWORD = process.env.SURREALDB_PASSWORD!;

let db: Surreal;

/**
 * Inicializa la conexión a SurrealDB
 */
export async function initDB(): Promise<Surreal> {
	if (!db) {
		db = new Surreal();
		
		try {
			// Conectar a SurrealDB Cloud con namespace y database
			await db.connect(DB_URL, {
				namespace: DB_NAMESPACE,
				database: DB_DATABASE
			});
			
			// Autenticar con credenciales de la nube
			await db.signin({
				username: DB_USERNAME,
				password: DB_PASSWORD
			});
			
			console.log('✅ Conectado a SurrealDB Cloud');
		} catch (error) {
			console.error('❌ Error conectando a SurrealDB:', error);
			throw error;
		}
	}
	
	return db;
}

/**
 * Obtiene la instancia de la base de datos
 */
export async function getDB(): Promise<Surreal> {
	if (!db) {
		return await initDB();
	}
	return db;
}

/**
 * Cierra la conexión a la base de datos
 */
export async function closeDB(): Promise<void> {
	if (db) {
		await db.close();
	}
}