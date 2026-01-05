#!/usr/bin/env tsx

/**
 * Script to clean the database
 */
import { Surreal } from 'surrealdb';
import { DB_CONFIG } from '../src/lib/db/config';

async function cleanDatabase(): Promise<void> {
	const db = new Surreal();

	try {
		// Add /rpc to the URL if not already present
		const connectUrl = DB_CONFIG.URL.endsWith('/rpc') ? DB_CONFIG.URL : `${DB_CONFIG.URL}/rpc`;
		await db.connect(connectUrl);
		
		// Use database-level authentication
		await db.signin({
			username: DB_CONFIG.USERNAME,
			password: DB_CONFIG.PASSWORD,
			namespace: DB_CONFIG.NAMESPACE,
			database: DB_CONFIG.DATABASE
		});

		console.log('🚀 Connected to SurrealDB for cleanup...');

		// Drop all tables
		const tables = ['user', 'post', 'tag', 'asset', 'setting'];
		
		for (const table of tables) {
			console.log(`🗑️  Dropping table: ${table}`);
			try {
				await db.query(`REMOVE TABLE ${table};`);
			} catch (error) {
				console.log(`⚠️  Table ${table} may not exist, continuing...`);
			}
		}

		console.log('✅ Database cleaned successfully');
	} catch (error) {
		console.error('❌ Error cleaning database:', error);
		throw error;
	} finally {
		await db.close();
	}
}

async function main(): Promise<void> {
	try {
		await cleanDatabase();
		process.exit(0);
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
}

main();