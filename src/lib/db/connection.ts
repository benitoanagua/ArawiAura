import { Surreal } from 'surrealdb';
import { DB_CONFIG } from './config';

let db: Surreal;

/**
 * Inicializa la conexión a SurrealDB
 */
export async function initDB(): Promise<Surreal> {
	if (!db) {
		db = new Surreal();
		
		try {
			// Add /rpc to the URL if not already present
			const connectUrl = DB_CONFIG.URL.endsWith('/rpc') ? DB_CONFIG.URL : `${DB_CONFIG.URL}/rpc`;
			await db.connect(connectUrl);
			
			// Autenticar con credenciales de la nube usando autenticación a nivel de base de datos
			await db.signin({
				username: DB_CONFIG.USERNAME,
				password: DB_CONFIG.PASSWORD,
				namespace: DB_CONFIG.NAMESPACE,
				database: DB_CONFIG.DATABASE
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