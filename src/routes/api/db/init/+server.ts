/**
 * API endpoint para inicializar la base de datos
 * Siguiendo las convenciones de SvelteKit
 */

import { json } from '@sveltejs/kit';
import { initializeDatabase } from '$lib/db/seed.js';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	try {
		await initializeDatabase();
		
		return json({
			success: true,
			message: 'Base de datos inicializada correctamente'
		});
	} catch (error) {
		console.error('Error inicializando base de datos:', error);
		
		return json({
			success: false,
			message: 'Error inicializando la base de datos',
			error: error instanceof Error ? error.message : 'Error desconocido'
		}, { status: 500 });
	}
};