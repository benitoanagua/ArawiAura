import { getDB } from './connection.js';
import type { Post, Tag, User, Asset, Setting, PostsQuery, CreatePostData, CreateTagData } from './types.js';

// Helper function to normalize SurrealDB results to plain objects
function normalizeRecord(record: any): any {
	if (record === null || record === undefined) {
		return record;
	}
	
	// Handle primitive types directly
	if (typeof record === 'string' || typeof record === 'number' || typeof record === 'boolean') {
		return record;
	}
	
	// Handle Date objects
	if (record instanceof Date) {
		return record;
	}
	
	// Check if this is a SurrealDB ID object (has tb and id properties)
	if (typeof record === 'object' && record.tb && record.id && 
		typeof record.tb === 'string' && typeof record.id === 'string') {
		// This is a SurrealDB record ID, convert to string format "table:id"
		return `${record.tb}:${record.id}`;
	}
	
	// Check if this is a SurrealDB ID object (has toString method but is not a string, Date, or array)
	if (typeof record === 'object' && record.toString && typeof record.toString === 'function' && 
		typeof record !== 'string' && !(record instanceof Date) && !Array.isArray(record) &&
		// Additional check to make sure it's not a regular object with many properties
		Object.keys(record).length <= 2) {
		// This looks like a SurrealDB record ID, convert to string
		try {
			const result = record.toString();
			// Check if the result looks like a record ID (table:id format)
			if (typeof result === 'string' && result.includes(':')) {
				return result;
			}
		} catch (e) {
			// If toString fails, continue to normal object processing
		}
	}
	
	if (typeof record === 'object' && !Array.isArray(record)) {
		const normalized: any = {};
		
		for (const key in record) {
			const value = record[key];
			
			// Special handling for 'id' fields which are often SurrealDB record IDs
			if (key === 'id' && value && typeof value === 'object' && typeof value !== 'string') {
				if (value.tb && value.id && typeof value.tb === 'string' && typeof value.id === 'string') {
					normalized[key] = `${value.tb}:${value.id}`;
				} else if (value.toString && typeof value.toString === 'function' && !(value instanceof Date) && !Array.isArray(value)) {
					try {
						const result = value.toString();
						if (typeof result === 'string' && result.includes(':')) {
							normalized[key] = result;
						} else {
							normalized[key] = normalizeRecord(value);
						}
					} catch (e) {
						normalized[key] = normalizeRecord(value);
					}
				} else {
					normalized[key] = normalizeRecord(value);
				}
			} else if (Array.isArray(value)) {
				// If it's an array, normalize each element
				const normalizedArray = [];
				for (const item of value) {
					// Check if array item is a SurrealDB ID object
					if (typeof item === 'object' && item.tb && item.id && 
						typeof item.tb === 'string' && typeof item.id === 'string') {
						normalizedArray.push(`${item.tb}:${item.id}`);
					} else if (typeof item === 'object' && item.toString && typeof item.toString === 'function' &&
						typeof item !== 'string' && !(item instanceof Date) && !Array.isArray(item) &&
						Object.keys(item).length <= 2) {
						try {
							const result = item.toString();
							if (typeof result === 'string' && result.includes(':')) {
								normalizedArray.push(result);
							} else {
								normalizedArray.push(normalizeRecord(item));
							}
						} catch (e) {
							normalizedArray.push(normalizeRecord(item));
						}
					} else {
						normalizedArray.push(normalizeRecord(item));
					}
				}
				normalized[key] = normalizedArray;
			} else {
				// Check if the value is a SurrealDB ID object
				if (typeof value === 'object' && value.tb && value.id && 
					typeof value.tb === 'string' && typeof value.id === 'string') {
					normalized[key] = `${value.tb}:${value.id}`;
				} else if (typeof value === 'object' && value.toString && typeof value.toString === 'function' &&
					typeof value !== 'string' && !(value instanceof Date) && !Array.isArray(value) &&
					Object.keys(value).length <= 2) {
					try {
						const result = value.toString();
						if (typeof result === 'string' && result.includes(':')) {
							normalized[key] = result;
						} else {
							normalized[key] = normalizeRecord(value);
						}
					} catch (e) {
						normalized[key] = normalizeRecord(value);
					}
				} else {
					// Recursively normalize nested objects
				normalized[key] = normalizeRecord(value);
				}
			}
		}
		
		return normalized;
	}
	
	// If it's an array, normalize each element
	if (Array.isArray(record)) {
		const normalizedArray = [];
		for (const item of record) {
			// Check if array item is a SurrealDB ID object
			if (typeof item === 'object' && item.tb && item.id && 
				typeof item.tb === 'string' && typeof item.id === 'string') {
				normalizedArray.push(`${item.tb}:${item.id}`);
			} else if (typeof item === 'object' && item.toString && typeof item.toString === 'function' &&
				typeof item !== 'string' && !(item instanceof Date) && !Array.isArray(item) &&
				Object.keys(item).length <= 2) {
				try {
					const result = item.toString();
					if (typeof result === 'string' && result.includes(':')) {
						normalizedArray.push(result);
					} else {
						normalizedArray.push(normalizeRecord(item));
					}
				} catch (e) {
					normalizedArray.push(normalizeRecord(item));
				}
			} else {
				normalizedArray.push(normalizeRecord(item));
			}
		}
		return normalizedArray;
	}
	
	return record;
}

// ============================================
// POSTS QUERIES
// ============================================

/**
 * Obtiene todos los posts publicados
 */
export async function getPublishedPosts(limit = 10, offset = 0): Promise<Post[]> {
	const db = await getDB();
	
	try {
		// First get the posts
		const result = await db.query(
			'SELECT * FROM post WHERE status = "published" ORDER BY published_at DESC LIMIT $limit START $offset;',
			{ limit, offset }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const posts = Array.isArray(queryResult) ? queryResult : [];
		
		// Normalize the posts first to handle SurrealDB IDs
		const normalizedPosts = posts.map(post => normalizeRecord(post));
		
		// For each post, fetch the author and tags separately
		const postsWithRelations = await Promise.all(normalizedPosts.map(async (post: any) => {
			// Fetch author
			let author = null;
			try {
				// Try different query approaches
				let authorResult;
				if (post.author && typeof post.author === 'string') {
					authorResult = await db.query(`SELECT * FROM ${post.author}`);
				} else {
					authorResult = await db.query('SELECT * FROM $authorId', { authorId: post.author });
				}
				const authorQueryResult = Array.isArray(authorResult) && authorResult.length > 0 ? authorResult[0] : [];
				if (Array.isArray(authorQueryResult) && authorQueryResult.length > 0) {
					author = normalizeRecord(authorQueryResult[0]);
				}
			} catch (error) {
				console.error('Error fetching author:', error);
			}
			
			// Fetch tags
			let tags = [];
			try {
				if (Array.isArray(post.tags)) {
					for (const tagId of post.tags) {
						const tagResult = await db.query('SELECT * FROM $tagId', { tagId });
						const tagQueryResult = Array.isArray(tagResult) && tagResult.length > 0 ? tagResult[0] : [];
						if (Array.isArray(tagQueryResult) && tagQueryResult.length > 0) {
							tags.push(normalizeRecord(tagQueryResult[0]));
						}
					}
				}
			} catch (error) {
				console.error('Error fetching tags:', error);
			}
			
			return {
				...post,
				author: author || { name: 'Usuario', slug: 'usuario' }, // Default fallback
				tags
			};
		}));
		
		return postsWithRelations;
	} catch (error) {
		console.error('Error fetching published posts:', error);
		return [];
	}
}

/**
 * Obtiene un post por su slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
	const db = await getDB();
	
	try {
		const result = await db.query(
			'SELECT * FROM post WHERE slug = $slug',
			{ slug }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const posts = Array.isArray(queryResult) ? queryResult : [];
		
		if (posts.length > 0) {
			const post = normalizeRecord(posts[0]);
			
			// Fetch author
			let author = null;
			try {
				// Try different query approaches
				let authorResult;
				if (post.author && typeof post.author === 'string') {
					authorResult = await db.query(`SELECT * FROM ${post.author}`);
				} else {
					authorResult = await db.query('SELECT * FROM $authorId', { authorId: post.author });
				}
				const authorQueryResult = Array.isArray(authorResult) && authorResult.length > 0 ? authorResult[0] : [];
				if (Array.isArray(authorQueryResult) && authorQueryResult.length > 0) {
					author = normalizeRecord(authorQueryResult[0]);
				}
			} catch (error) {
				console.error('Error fetching author:', error);
			}
			
			// Fetch tags
			let tags = [];
			try {
				if (Array.isArray(post.tags)) {
					for (const tagId of post.tags) {
						const tagResult = await db.query('SELECT * FROM $tagId', { tagId });
						const tagQueryResult = Array.isArray(tagResult) && tagResult.length > 0 ? tagResult[0] : [];
						if (Array.isArray(tagQueryResult) && tagQueryResult.length > 0) {
							tags.push(normalizeRecord(tagQueryResult[0]));
						}
					}
				}
			} catch (error) {
				console.error('Error fetching tags:', error);
			}
			
			return {
				...post,
				author: author || { name: 'Usuario', slug: 'usuario' }, // Default fallback
				tags
			};
		}
		
		return null;
	} catch (error) {
		console.error('Error fetching post by slug:', error);
		return null;
	}
}

/**
 * Obtiene posts por tag
 */
export async function getPostsByTag(tagSlug: string, limit = 10): Promise<Post[]> {
	const db = await getDB();
	
	try {
		// First get the posts
		const result = await db.query(
			'SELECT * FROM post WHERE status = "published" AND tags[*].slug CONTAINS $tagSlug ORDER BY published_at DESC LIMIT $limit',
			{ tagSlug, limit }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const posts = Array.isArray(queryResult) ? queryResult : [];
		
		// Normalize the posts first to handle SurrealDB IDs
		const normalizedPosts = posts.map(post => normalizeRecord(post));
		
		// For each post, fetch the author and tags separately
		const postsWithRelations = await Promise.all(normalizedPosts.map(async (post: any) => {
			// Fetch author
			let author = null;
			try {
				const authorResult = await db.query('SELECT * FROM $authorId', { authorId: post.author });
				const authorQueryResult = Array.isArray(authorResult) && authorResult.length > 0 ? authorResult[0] : [];
				if (Array.isArray(authorQueryResult) && authorQueryResult.length > 0) {
					author = normalizeRecord(authorQueryResult[0]);
				}
			} catch (error) {
				console.error('Error fetching author:', error);
			}
			
			// Fetch tags
			let tags = [];
			try {
				if (Array.isArray(post.tags)) {
					for (const tagId of post.tags) {
						const tagResult = await db.query('SELECT * FROM $tagId', { tagId });
						const tagQueryResult = Array.isArray(tagResult) && tagResult.length > 0 ? tagResult[0] : [];
						if (Array.isArray(tagQueryResult) && tagQueryResult.length > 0) {
							tags.push(normalizeRecord(tagQueryResult[0]));
						}
					}
				}
			} catch (error) {
				console.error('Error fetching tags:', error);
			}
			
			return {
				...post,
				author: author || { name: 'Usuario', slug: 'usuario' }, // Default fallback
				tags
			};
		}));
		
		return postsWithRelations;
	} catch (error) {
		console.error('Error fetching posts by tag:', error);
		return [];
	}
}

/**
 * Busca posts por título o contenido
 */
export async function searchPosts(query: string, limit = 10): Promise<Post[]> {
	const db = await getDB();
	
	try {
		// First get the posts
		const result = await db.query(
			'SELECT * FROM post WHERE status = "published" AND (title ~ $query OR content ~ $query) ORDER BY published_at DESC LIMIT $limit',
			{ query, limit }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const posts = Array.isArray(queryResult) ? queryResult : [];
		
		// Normalize the posts first to handle SurrealDB IDs
		const normalizedPosts = posts.map(post => normalizeRecord(post));
		
		// For each post, fetch the author and tags separately
		const postsWithRelations = await Promise.all(normalizedPosts.map(async (post: any) => {
			// Fetch author
			let author = null;
			try {
				const authorResult = await db.query('SELECT * FROM $authorId', { authorId: post.author });
				const authorQueryResult = Array.isArray(authorResult) && authorResult.length > 0 ? authorResult[0] : [];
				if (Array.isArray(authorQueryResult) && authorQueryResult.length > 0) {
					author = normalizeRecord(authorQueryResult[0]);
				}
			} catch (error) {
				console.error('Error fetching author:', error);
			}
			
			// Fetch tags
			let tags = [];
			try {
				if (Array.isArray(post.tags)) {
					for (const tagId of post.tags) {
						const tagResult = await db.query('SELECT * FROM $tagId', { tagId });
						const tagQueryResult = Array.isArray(tagResult) && tagResult.length > 0 ? tagResult[0] : [];
						if (Array.isArray(tagQueryResult) && tagQueryResult.length > 0) {
							tags.push(normalizeRecord(tagQueryResult[0]));
						}
					}
				}
			} catch (error) {
				console.error('Error fetching tags:', error);
			}
			
			return {
				...post,
				author: author || { name: 'Usuario', slug: 'usuario' }, // Default fallback
				tags
			};
		}));
		
		return postsWithRelations;
	} catch (error) {
		console.error('Error searching posts:', error);
		return [];
	}
}

/**
 * Crea un nuevo post
 */
export async function createPost(data: CreatePostData): Promise<Post> {
	const db = await getDB();
	
	try {
		const postData = {
			...data,
			html: data.content, // TODO: Renderizar markdown a HTML
			published_at: data.status === 'published' ? (data.published_at || new Date().toISOString()) : null,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		};
		
		const result = await db.query(
			'CREATE post CONTENT $data;',
			{ data: postData }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const posts = Array.isArray(queryResult) ? queryResult : [];
		
		const post = posts.length > 0 ? normalizeRecord(posts[0]) : null;
		if (!post) {
			throw new Error('Failed to create post');
		}
		return post;
	} catch (error) {
		console.error('Error creating post:', error);
		throw error;
	}
}

// ============================================
// TAGS QUERIES
// ============================================

// ============================================
// TAGS QUERIES
// ============================================

/**
 * Obtiene todos los tags
 */
export async function getAllTags(): Promise<Tag[]> {
	const db = await getDB();
	
	try {
		const result = await db.query('SELECT * FROM tag ORDER BY name ASC;');
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const tags = Array.isArray(queryResult) ? queryResult : [];
		
		return tags.map(tag => normalizeRecord(tag));
	} catch (error) {
		console.error('Error fetching tags:', error);
		return [];
	}
}

/**
 * Obtiene un tag por slug
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
	const db = await getDB();
	
	try {
		const result = await db.query('SELECT * FROM tag WHERE slug = $slug;', { slug });
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const tags = Array.isArray(queryResult) ? queryResult : [];
		
		return tags.length > 0 ? normalizeRecord(tags[0]) : null;
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
		const tagData = {
			...data,
			created_at: new Date().toISOString()
		};
		
		const result = await db.query('CREATE tag CONTENT $data;', { data: tagData });
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const tags = Array.isArray(queryResult) ? queryResult : [];
		
		const tag = tags.length > 0 ? normalizeRecord(tags[0]) : null;
		if (!tag) {
			throw new Error('Failed to create tag');
		}
		return tag;
	} catch (error) {
		console.error('Error creating tag:', error);
		throw error;
	}
}

// ============================================
// USERS QUERIES
// ============================================

// ============================================
// USERS QUERIES
// ============================================

/**
 * Obtiene un usuario por email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
	const db = await getDB();
	
	try {
		const result = await db.query('SELECT * FROM user WHERE email = $email;', { email });
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const users = Array.isArray(queryResult) ? queryResult : [];
		
		return users.length > 0 ? normalizeRecord(users[0]) : null;
	} catch (error) {
		console.error('Error fetching user by email:', error);
		return null;
	}
}

/**
 * Obtiene un usuario por slug
 */
export async function getUserBySlug(slug: string): Promise<User | null> {
	const db = await getDB();
	
	try {
		const result = await db.query('SELECT * FROM user WHERE slug = $slug;', { slug });
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const users = Array.isArray(queryResult) ? queryResult : [];
		
		return users.length > 0 ? normalizeRecord(users[0]) : null;
	} catch (error) {
		console.error('Error fetching user by slug:', error);
		return null;
	}
}

// ============================================
// SETTINGS QUERIES
// ============================================

// ============================================
// SETTINGS QUERIES
// ============================================

/**
 * Obtiene una configuración por clave
 */
export async function getSetting(key: string): Promise<any> {
	const db = await getDB();
	
	try {
		const result = await db.query('SELECT value FROM setting WHERE id = $key;', { 
			key: `setting:${key}` 
		});
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const settings = Array.isArray(queryResult) ? queryResult : [];
		
		return settings.length > 0 ? settings[0].value : null;
	} catch (error) {
		console.error('Error fetching setting:', error);
		return null;
	}
}

/**
 * Obtiene todas las configuraciones del sitio
 */
export async function getAllSettings(): Promise<Record<string, any>> {
	const db = await getDB();
	
	try {
		const result = await db.query('SELECT * FROM setting;');
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const settings = Array.isArray(queryResult) ? queryResult : [];
		const settingsMap: Record<string, any> = {};
		
		settings.forEach((setting: any) => {
			// Handle both string and object IDs
			const id = typeof setting.id === 'string' ? setting.id : setting.id?.toString() || '';
			const key = id.replace('setting:', '');
			settingsMap[key] = setting.value;
		});
		
		return settingsMap;
	} catch (error) {
		console.error('Error fetching all settings:', error);
		return {};
	}
}

/**
 * Actualiza una configuración
 */
export async function updateSetting(key: string, value: any): Promise<void> {
	const db = await getDB();
	
	try {
		await db.query('UPDATE $key SET value = $value;', { 
			key: `setting:${key}`, 
			value 
		});
	} catch (error) {
		console.error('Error updating setting:', error);
		throw error;
	}
}