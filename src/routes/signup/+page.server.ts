import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to admin if already logged in
	if (locals.user) {
		redirect(302, '/admin');
	}

	return {
		user: null
	};
};
