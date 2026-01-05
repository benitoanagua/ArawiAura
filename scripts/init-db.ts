#!/usr/bin/env tsx

/**
 * Script de inicialización de base de datos
 * Usa las funciones de seed de SvelteKit
 */

import { initializeDatabase } from '../src/lib/db/seed.js';

async function main(): Promise<void> {
	try {
		await initializeDatabase();
		process.exit(0);
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
}

main();