import { getDB } from './connection.js';
import type { Post, Tag, User, Asset, Setting, PostsQuery, CreatePostData, CreateTagData } from './types.js';

// ============================================
// POSTS QUERIES
// ============================================

/**
 * Obtiene todos los posts publicados
 */
export async function getPublishedPosts(limit = 10, offset = 0): Promise<Post[]> {
	const db = await getDB();
	
	try {
		const result = await db.query(
			'SELECT *, author.*, tags.* FROM post WHERE status = "published" ORDER BY published_at DESC LIMIT $limit START $offset FETCH author, tags;',
			{ limit, offset }
		);
		
		return (result[0] as any)?.result || [];
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
			'SELECT *, author.*, tags.* FROM post WHERE slug = $slug FETCH author, tags;',
			{ slug }
		);
		
		const posts = (result[0] as any)?.result || [];
		return posts.length > 0 ? posts[0] : null;
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
		const result = await db.query(
			'SELECT *, author.*, tags.* FROM post WHERE status = "published" AND tags[*].slug CONTAINS $tagSlug ORDER BY published_at DESC LIMIT $limit FETCH author, tags;',
			{ tagSlug, limit }
		);
		
		return (result[0] as any)?.result || [];
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
		const result = await db.query(
			'SELECT *, author.*, tags.* FROM post WHERE status = "published" AND (title ~ $query OR content ~ $query) ORDER BY published_at DESC LIMIT $limit FETCH author, tags;',
			{ query, limit }
		);
		
		return (result[0] as any)?.result || [];
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
		
		return (result[0] as any)?.result[0];
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
		return (result[0] as any)?.result || [];
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
		const tags = (result[0] as any)?.result || [];
		return tags.length > 0 ? tags[0] : null;
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
		return (result[0] as any)?.result[0];
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
		const users = (result[0] as any)?.result || [];
		return users.length > 0 ? users[0] : null;
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
		const users = (result[0] as any)?.result || [];
		return users.length > 0 ? users[0] : null;
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
		const settings = (result[0] as any)?.result || [];
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
		const settings = (result[0] as any)?.result || [];
		const settingsMap: Record<string, any> = {};
		
		settings.forEach((setting: any) => {
			const key = setting.id.replace('setting:', '');
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