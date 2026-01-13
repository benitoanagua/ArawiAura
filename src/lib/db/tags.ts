import { getDB } from './connection.js';
import { normalizeRecord } from './utils.js';
import type { Tag, CreateTagData } from './types.js';

/**
 * Obtiene todos los tags
 */
export async function getAllTags(): Promise<Tag[]> {
	const db = await getDB();
	
	try {
		const result = await db.query('SELECT * FROM tag ORDER BY name ASC;');
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const tags = Array.isArray(queryResult) ? queryResult : [];
		
		return tags.map(tag => normalizeRecord(tag) as Tag);
	} catch (error) {
		console.error('Error fetching all tags:', error);
		return [];
	}
}

/**
 * Obtiene un tag por su slug
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
	const db = await getDB();
	
	try {
		const result = await db.query(
			'SELECT * FROM tag WHERE slug = $slug',
			{ slug }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const tags = Array.isArray(queryResult) ? queryResult : [];
		
		if (tags.length > 0) {
			return normalizeRecord(tags[0]) as Tag;
		}
		
		return null;
	} catch (error) {
		console.error('Error fetching tag by slug:', error);
		return null;
	}
}

/**
 * Crea un nuevo tag
 */
export async function createTag(data: CreateTagData): Promise<Tag> {
	const db = await getDB();
	
	try {
		const result = await db.create('tag', {
			name: data.name,
			slug: data.slug,
			description: data.description,
			color: data.color,
			created_at: new Date()
		});
		
		return normalizeRecord(result) as Tag;
	} catch (error) {
		console.error('Error creating tag:', error);
		throw error;
	}
}