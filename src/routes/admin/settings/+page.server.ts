import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/connection.js';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/');
	}

	try {
		// Get settings from database
		const settingsResult = (await db.query('SELECT key, value FROM setting')) as any[];

		const settingsMap: Record<string, any> = {};
		const settingsList = (settingsResult[0] || []) as Array<{ key: string; value: any }>;
		settingsList.forEach((s: any) => {
			settingsMap[s.key] = s.value;
		});

		return {
			settings: settingsMap
		};
	} catch (error) {
		console.error('Settings load error:', error);
		return {
			settings: {}
		};
	}
};
