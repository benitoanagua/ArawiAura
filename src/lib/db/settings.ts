import { getDB } from './connection.js';

/**
 * Obtiene un setting por clave
 */
export async function getSetting(key: string): Promise<any> {
	const db = await getDB();
	
	try {
		const result = await db.query(
			'SELECT * FROM setting WHERE id = $key',
			{ key }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const settings = Array.isArray(queryResult) ? queryResult : [];
		
		if (settings.length > 0) {
			return settings[0].value;
		}
		
		return null;
	} catch (error) {
		console.error('Error fetching setting:', error);
		return null;
	}
}

/**
 * Obtiene todos los settings
 */
export async function getAllSettings(): Promise<Record<string, any>> {
	const db = await getDB();
	
	try {
		const result = await db.query('SELECT * FROM setting;');
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const settings = Array.isArray(queryResult) ? queryResult : [];
		
		const settingsMap: Record<string, any> = {};
		settings.forEach(setting => {
			settingsMap[setting.id] = setting.value;
		});
		
		return settingsMap;
	} catch (error) {
		console.error('Error fetching all settings:', error);
		return {};
	}
}

/**
 * Actualiza o crea un setting
 */
export async function updateSetting(key: string, value: any): Promise<void> {
	const db = await getDB();
	
	try {
		await db.query(
			'UPSERT setting:$key SET value = $value;',
			{ key, value }
		);
	} catch (error) {
		console.error('Error updating setting:', error);
		throw error;
	}
}