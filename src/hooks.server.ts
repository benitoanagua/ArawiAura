import { type Handle } from '@sveltejs/kit';
import { authenticateWithToken } from '$lib/db/auth';

/**
 * Server-side hook to handle session authentication
 * Extracts JWT token from cookies and validates it
 */
export const handle: Handle = async ({ event, resolve }) => {
	// Get token from cookies
	const token = event.cookies.get('auth_token');

	event.locals.user = null;
	event.locals.token = null;

	if (token) {
		try {
			// Verify and decode the token to get user data
			const user = await authenticateWithToken(token);
			event.locals.user = user;
			event.locals.token = token;
		} catch (error) {
			console.error('Token authentication failed:', error);
			// Token is invalid, clear it
			event.cookies.delete('auth_token', { path: '/' });
		}
	}

	// Make user available to all routes
	return await resolve(event);
};
