import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	// Log user for debugging
	console.log('Admin layout - user:', event.locals.user);
	console.log('Admin layout - user role:', event.locals.user?.role);

	// Check if user is authenticated and is admin
	if (!event.locals.user) {
		console.log('No user found, redirecting to admin/login');
		throw redirect(302, '/admin/login');
	}

	// Check if user is admin
	if (event.locals.user.role !== 'admin') {
		console.log('User is not admin, redirecting to home. Role:', event.locals.user.role);
		throw redirect(302, '/');
	}

	console.log('User is admin, allowing access');
	return {
		user: event.locals.user
	};
};
