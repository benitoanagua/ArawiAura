import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/connection.js';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/');
	}

	try {
		// Get tags with post count
		const tagsResult = (await db.query(
			'SELECT id, name, description FROM tag ORDER BY name ASC'
		)) as any[];

		return {
			tags: (tagsResult[0] || []) as Array<{
				id: string;
				name: string;
				description?: string;
			}>
		};
	} catch (error) {
		console.error('Tags load error:', error);
		return {
			tags: []
		};
	}
};
