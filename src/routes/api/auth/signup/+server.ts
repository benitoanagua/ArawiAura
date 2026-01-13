import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { signup } from '$lib/db/auth';
import type { SignupData } from '$lib/db/types';

/**
 * POST /api/auth/signup
 * Create a new user account
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const body = (await request.json()) as SignupData;

		// Validate input
		if (!body.name || !body.slug || !body.email || !body.password) {
			return json({ error: 'Name, slug, email and password are required' }, { status: 400 });
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(body.email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		// Basic slug validation (alphanumeric and hyphens)
		const slugRegex = /^[a-z0-9-]+$/;
		if (!slugRegex.test(body.slug)) {
			return json(
				{ error: 'Slug must contain only lowercase letters, numbers, and hyphens' },
				{ status: 400 }
			);
		}

		// Password strength check
		if (body.password.length < 8) {
			return json({ error: 'Password must be at least 8 characters' }, { status: 400 });
		}

		// Sign up with SurrealDB
		const { user, token } = await signup(
			body.name,
			body.slug,
			body.email,
			body.password,
			body.bio || ''
		);

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
			{ status: 201 }
		);
	} catch (error) {
		console.error('Signup error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Sign up failed';

		// Check for common error messages
		if (errorMessage.includes('unique') || errorMessage.includes('already exists')) {
			return json({ error: 'Email or slug already exists' }, { status: 409 });
		}

		return json({ error: errorMessage }, { status: 500 });
	}
};
