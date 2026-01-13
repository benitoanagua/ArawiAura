import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * POST /api/auth/logout
 * Sign out the current user
 */
export const POST: RequestHandler = async ({ cookies }) => {
	try {
		// Clear the auth token cookie
		cookies.delete('auth_token', { path: '/' });

		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Logout error:', error);
		return json({ error: 'Logout failed' }, { status: 500 });
	}
};
