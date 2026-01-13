import { getAllSettings } from '$lib/db/settings.js';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	try {
		const settings = await getAllSettings();
		
		return {
			settings: {
				site_title: settings.site_title || 'Arawi Aura',
				site_description: settings.site_description || 'Blog personal',
				site_url: settings.site_url || 'https://arawiaura.com'
			}
		};
	} catch (error) {
		console.error('Error loading settings:', error);
		
		// Fallback settings
		return {
			settings: {
				site_title: 'Arawi Aura',
				site_description: 'Blog personal de tecnología y desarrollo',
				site_url: 'https://arawiaura.com'
			}
		};
	}
};