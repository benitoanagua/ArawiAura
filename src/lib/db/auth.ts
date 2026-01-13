import { getDB } from './connection';
import type { User } from './types';
import { normalizeRecord } from './utils';

/**
 * Sign up a new user record
 */
export async function signup(
	name: string,
	slug: string,
	email: string,
	password: string,
	bio: string = ''
): Promise<{ user: User; token: string }> {
	try {
		const db = await getDB();
		const response: any = await db.signup({
			namespace: process.env.SURREALDB_NAMESPACE || 'poetry',
			database: process.env.SURREALDB_DATABASE || 'blog',
			access: 'user',
			variables: {
				name,
				slug,
				email,
				password,
				bio
			}
		});

		// db.signup() returns the token as a string
		const token = typeof response === 'string' ? response : response?.token;

		if (!token) {
			throw new Error('No token received from signup');
		}

		// Get the user data by authenticating with the token
		const user = await authenticateWithToken(token);

		return {
			user,
			token
		};
	} catch (error) {
		console.error('Signup error:', error);
		throw error;
	}
}

/**
 * Sign in an existing user
 */
export async function signin(
	email: string,
	password: string
): Promise<{ user: User; token: string }> {
	try {
		const db = await getDB();

		// Query for user by email
		const userQuery = await db.query<any[]>('SELECT * FROM user WHERE email = $email', { email });

		if (!userQuery || userQuery.length === 0 || !userQuery[0] || userQuery[0].length === 0) {
			throw new Error('Invalid email or password');
		}

		const userRecord = userQuery[0][0];

		// TODO: Implement proper password validation
		// const passwordMatch = await db.query('RETURN crypto::argon2::compare($password, $hash)', {
		// 	password,
		// 	hash: userRecord.password
		// });
		// if (!passwordMatch || !passwordMatch[0] || passwordMatch[0][0] !== true) {
		// 	throw new Error('Invalid email or password');
		// }

		const user = normalizeRecord(userRecord) as User;

		// Create a JWT token
		// TODO: Use proper JWT encoding when available
		// For now, use user ID as session token
		const token = user.id;

		return { user, token };
	} catch (error) {
		console.error('Signin error:', error);
		throw error;
	}
}

/**
 * Authenticate with an existing token
 * Returns the authenticated user data
 */
export async function authenticateWithToken(token: string): Promise<User> {
	try {
		const db = await getDB();
		await db.authenticate(token);

		// Query to get the full user data
		const result: any = await db.query('SELECT * FROM $auth');

		if (!result || result.length === 0 || !result[0] || result[0].length === 0) {
			throw new Error('User not found');
		}

		return result[0][0] as User;
	} catch (error) {
		console.error('Authentication error:', error);
		throw error;
	}
}

/**
 * Verify if a user can perform an action
 * Checks if user is authenticated and has required role
 */
export function canUserAccess(user: User | null, requiredRole?: string): boolean {
	if (!user) return false;
	if (!requiredRole) return true;
	return user.role === requiredRole || user.role === 'admin';
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
	return user?.role === 'admin';
}

/**
 * Check if user is enabled
 */
export function isUserEnabled(user: User | null): boolean {
	return user?.enabled === true;
}

/**
 * Verify if a token is still valid
 */
export async function verifyToken(token: string): Promise<boolean> {
	try {
		const user = await authenticateWithToken(token);
		return !!user;
	} catch {
		return false;
	}
}
