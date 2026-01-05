/**
 * API endpoint para verificar el estado de la base de datos
 */

import { json } from '@sveltejs/kit';
import { checkConnection } from '$lib/db/seed.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const isConnected = await checkConnection();
		
		return json({
			connected: isConnected,
			message: isConnected ? 'Conexión exitosa' : 'No se puede conectar'
		});
	} catch (error) {
		return json({
			connected: false,
			message: 'Error verificando conexión',
			error: error instanceof Error ? error.message : 'Error desconocido'
		}, { status: 500 });
	}
};