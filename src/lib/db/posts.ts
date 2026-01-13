import { getDB } from './connection.js';
import { normalizeRecord } from './utils.js';
import type { Post, CreatePostData } from './types.js';

/**
 * Obtiene posts publicados con paginación
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
				author: author,
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
 * Obtiene posts publicados por autor
 */
export async function getPublishedPostsByAuthor(authorSlug: string, limit = 10, offset = 0): Promise<Post[]> {
	const db = await getDB();
	
	try {
		// First get the author
		const authorResult = await db.query('SELECT * FROM user WHERE slug = $slug', { slug: authorSlug });
		
		const authorQueryResult = Array.isArray(authorResult) && authorResult.length > 0 ? authorResult[0] : [];
		const authors = Array.isArray(authorQueryResult) ? authorQueryResult : [];
		
		if (authors.length === 0) {
			return [];
		}
		
		const author = normalizeRecord(authors[0]);
		
		// Get posts by this author using direct string interpolation
		// This approach works reliably with SurrealDB
		const result = await db.query(`SELECT * FROM post WHERE status = "published" AND author = ${author.id} ORDER BY published_at DESC LIMIT ${limit} START ${offset};`);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const posts = Array.isArray(queryResult) ? queryResult : [];
		
		// Normalize the posts first to handle SurrealDB IDs
		const normalizedPosts = posts.map(post => normalizeRecord(post));
		
		// For each post, fetch the tags
		const postsWithRelations = await Promise.all(normalizedPosts.map(async (post: any) => {
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
				author: author,
				tags
			};
		}));
		
		return postsWithRelations;
	} catch (error) {
		console.error('Error fetching published posts by author:', error);
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
				author,
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
		// First get the tag
		const tagResult = await db.query('SELECT * FROM tag WHERE slug = $slug', { slug: tagSlug });
		const tagQueryResult = Array.isArray(tagResult) && tagResult.length > 0 ? tagResult[0] : [];
		const tags = Array.isArray(tagQueryResult) ? tagQueryResult : [];
		
		if (tags.length === 0) {
			return [];
		}
		
		const tag = normalizeRecord(tags[0]);
		
		// Get posts that have this tag
		const result = await db.query(
			'SELECT * FROM post WHERE status = "published" AND $tagId IN tags ORDER BY published_at DESC LIMIT $limit;',
			{ tagId: tag.id, limit }
		);
		
		const queryResult = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const posts = Array.isArray(queryResult) ? queryResult : [];
		
		// Normalize and fetch relations
		const normalizedPosts = posts.map(post => normalizeRecord(post));
		
		const postsWithRelations = await Promise.all(normalizedPosts.map(async (post: any) => {
			// Fetch author
			let author = null;
			try {
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
			
			return {
				...post,
				author,
				tags: [tag] // We know this post has this tag
			};
		}));
		
		return postsWithRelations;
	} catch (error) {
		console.error('Error fetching posts by tag:', error);
		return [];
	}
}

/**
 * Busca posts por término
 */
export async function searchPosts(query: string, limit = 10): Promise<Post[]> {
	const db = await getDB();
	
	try {
		const result = await db.query(
			'SELECT * FROM post WHERE status = "published" AND (title CONTAINS $query OR content CONTAINS $query) ORDER BY published_at DESC LIMIT $limit;',
			{ query, limit }
		);
		
		const searchResults = Array.isArray(result) && result.length > 0 ? result[0] : [];
		const posts = Array.isArray(searchResults) ? searchResults : [];
		
		// Normalize and fetch relations for each post
		const normalizedPosts = posts.map(post => normalizeRecord(post));
		
		const postsWithRelations = await Promise.all(normalizedPosts.map(async (post: any) => {
			// Fetch author
			let author = null;
			try {
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
				author,
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
		const result = await db.create('post', {
			title: data.title,
			slug: data.slug,
			excerpt: data.excerpt,
			content: data.content,
			status: data.status,
			author: data.author,
			tags: data.tags || [],
			created_at: new Date(),
			updated_at: new Date(),
			published_at: data.status === 'published' ? new Date() : undefined
		});
		
		return normalizeRecord(result);
	} catch (error) {
		console.error('Error creating post:', error);
		throw error;
	}
}