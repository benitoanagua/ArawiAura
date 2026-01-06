#!/usr/bin/env tsx

/**
 * Script to check the database content
 */
import { Surreal } from 'surrealdb';
import { DB_CONFIG } from '../src/lib/db/config';

async function checkDatabase(): Promise<void> {
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

		console.log('🚀 Connected to SurrealDB for checking...');
		
		// Check if posts exist
		const posts = await db.query('SELECT * FROM post;');
		console.log('Full posts result:', JSON.stringify(posts, null, 2));
		const postsResult = Array.isArray(posts) && posts.length > 0 && (posts[0] as any)?.result ? (posts[0] as any).result : [];
		console.log('Posts found:', postsResult.length);
		console.log('Post data:', postsResult);

		// Check if users exist
		const users = await db.query('SELECT * FROM user;');
		console.log('Full users result:', JSON.stringify(users, null, 2));
		const usersResult = Array.isArray(users) && users.length > 0 && (users[0] as any)?.result ? (users[0] as any).result : [];
		console.log('Users found:', usersResult.length);
		console.log('User data:', usersResult);

		// Check if tags exist
		const tags = await db.query('SELECT * FROM tag;');
		console.log('Full tags result:', JSON.stringify(tags, null, 2));
		const tagsResult = Array.isArray(tags) && tags.length > 0 && (tags[0] as any)?.result ? (tags[0] as any).result : [];
		console.log('Tags found:', tagsResult.length);
		console.log('Tag data:', tagsResult);

	} catch (error) {
		console.error('❌ Error checking database:', error);
		throw error;
	} finally {
		await db.close();
	}
}

async function main(): Promise<void> {
	try {
		await checkDatabase();
		process.exit(0);
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
}

main();