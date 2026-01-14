import { Surreal } from 'surrealdb';
import { DB_CONFIG } from './config';

let _db: Surreal;

/**
 * Inicializa la conexión a SurrealDB
 */
export async function initDB(): Promise<Surreal> {
	if (!_db) {
		_db = new Surreal();

		try {
			// Add /rpc to the URL if not already present
			const connectUrl = DB_CONFIG.URL.endsWith('/rpc') ? DB_CONFIG.URL : `${DB_CONFIG.URL}/rpc`;
			await _db.connect(connectUrl);

			// Autenticar con credenciales de la nube usando autenticación a nivel de base de datos
			await _db.signin({
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

	return _db;
}

/**
 * Obtiene la instancia de la base de datos
 */
export async function getDB(): Promise<Surreal> {
	if (!_db) {
		return await initDB();
	}
	return _db;
}

/**
 * Cierra la conexión a la base de datos
 */
export async function closeDB(): Promise<void> {
	if (_db) {
		await _db.close();
	}
}

// Export db instance for direct access
export { _db as db };
