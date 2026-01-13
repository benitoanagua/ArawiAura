import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { signin } from '$lib/db/auth';
import type { SigninData } from '$lib/db/types';

/**
 * POST /api/auth/signin
 * Sign in a user with email and password
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const body = (await request.json()) as SigninData;

		// Validate input
		if (!body.email || !body.password) {
			return json({ error: 'Email and password are required' }, { status: 400 });
		}

		// Sign in with SurrealDB
		const { user, token } = await signin(body.email, body.password);

		// Set httpOnly cookie with token
		cookies.set('auth_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7, // 7 days
			path: '/'
		});

		return json(
			{
				success: true,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					slug: user.slug,
					role: user.role,
					enabled: user.enabled
				}
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Signin error:', error);
		console.error('Error details:', JSON.stringify(error, null, 2));

		const errorMessage = error instanceof Error ? error.message : 'Sign in failed';

		// Check for common error messages
		if (errorMessage.includes('not found') || errorMessage.includes('Invalid email or password')) {
			return json({ error: 'Invalid email or password' }, { status: 401 });
		}

		return json({ error: errorMessage }, { status: 500 });
	}
};
