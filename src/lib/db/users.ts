import { getDB } from './connection.js';
import { normalizeRecord } from './utils.js';
import type { User } from './types.js';

/**
 * Obtiene un usuario por email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
	const db = await getDB();
	
	try {
		const result = await db.query(
			'SELECT * FROM user WHERE email = $email',
			{ email }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const users = Array.isArray(queryResult) ? queryResult : [];
		
		if (users.length > 0) {
			return normalizeRecord(users[0]) as User;
		}
		
		return null;
	} catch (error) {
		console.error('Error fetching user by email:', error);
		return null;
	}
}

/**
 * Obtiene un usuario por slug
 */
export async function getUserBySlug(slug: string): Promise<User | null> {
	const db = await getDB();
	
	try {
		const result = await db.query(
			'SELECT * FROM user WHERE slug = $slug',
			{ slug }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const users = Array.isArray(queryResult) ? queryResult : [];
		
		if (users.length > 0) {
			return normalizeRecord(users[0]) as User;
		}
		
		return null;
	} catch (error) {
		console.error('Error fetching user by slug:', error);
		return null;
	}
}