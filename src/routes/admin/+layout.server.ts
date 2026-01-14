import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	// Check if user is authenticated and is admin
	if (!event.locals.user) {
		throw redirect(302, '/admin/login');
	}

	// Check if user is admin
	if (event.locals.user.role !== 'admin') {
		throw redirect(302, '/');
	}

	return {
		user: event.locals.user
	};
};
