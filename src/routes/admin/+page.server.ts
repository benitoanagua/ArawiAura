import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	// Require authentication
	if (!locals.user) {
		redirect(302, '/login');
	}

	// Optionally require admin role
	if (locals.user.role !== 'admin') {
		// If not admin, redirect to a public user page or home
		redirect(302, '/');
	}

	return {
		user: locals.user
	};
};
