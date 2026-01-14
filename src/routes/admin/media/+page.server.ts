import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/connection.js';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/');
	}

	try {
		const assetsResult = (await db.query(
			'SELECT id, filename, url, size, created_at FROM asset ORDER BY created_at DESC'
		)) as any[];

		return {
			assets: (assetsResult[0] || []) as Array<{
				id: string;
				filename: string;
				url: string;
				size: number;
				created_at: string;
			}>
		};
	} catch (error) {
		console.error('Media load error:', error);
		return {
			assets: []
		};
	}
};
