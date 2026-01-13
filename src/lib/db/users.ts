import { getDB } from './connection.js';
import { normalizeRecord } from './utils.js';
import type { User } from './types.js';

/**
 * Obtiene un usuario por ID
 */
export async function getUserById(id: string): Promise<User | null> {
	const db = await getDB();

	try {
		const result = (await db.select(id)) as unknown;

		if (result) {
			return normalizeRecord(result) as User;
		}

		return null;
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		return null;
	}
}

/**
 * Obtiene un usuario por email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
	const db = await getDB();

	try {
		const result = await db.query('SELECT * FROM user WHERE email = $email', { email });

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
		const result = await db.query('SELECT * FROM user WHERE slug = $slug', { slug });

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

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
	const db = await getDB();

	try {
		const result = await db.query<User[]>('SELECT * FROM user');

		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const users = Array.isArray(queryResult) ? queryResult : [];

		return users.map((user) => normalizeRecord(user) as User);
	} catch (error) {
		console.error('Error fetching all users:', error);
		return [];
	}
}

/**
 * Update user profile (non-password fields)
 */
export async function updateUserProfile(
	id: string,
	updates: Partial<Pick<User, 'name' | 'bio' | 'profile_image'>>
): Promise<User | null> {
	const db = await getDB();

	try {
		const result = await db.merge(id, updates);

		if (result && Array.isArray(result) && result.length > 0) {
			return normalizeRecord(result[0]) as User;
		}

		return null;
	} catch (error) {
		console.error('Error updating user profile:', error);
		return null;
	}
}

/**
 * Disable a user account
 */
export async function disableUser(id: string): Promise<boolean> {
	const db = await getDB();

	try {
		const result = await db.merge(id, { enabled: false });
		return result && Array.isArray(result) && result.length > 0;
	} catch (error) {
		console.error('Error disabling user:', error);
		return false;
	}
}

/**
 * Enable a user account
 */
export async function enableUser(id: string): Promise<boolean> {
	const db = await getDB();

	try {
		const result = await db.merge(id, { enabled: true });
		return result && Array.isArray(result) && result.length > 0;
	} catch (error) {
		console.error('Error enabling user:', error);
		return false;
	}
}
