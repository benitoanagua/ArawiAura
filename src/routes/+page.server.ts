import { getPublishedPosts, getAllTags } from '$lib/db/queries.js';
import { calculateReadingTime, countWords } from '$lib/utils/markdown.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = 10;
		const offset = (page - 1) * limit;
		
		const [posts, tags] = await Promise.all([
			getPublishedPosts(limit, offset),
			getAllTags()
		]);
		
		// Agregar metadatos a los posts
		const postsWithMeta = posts.map(post => ({
			...post,
			reading_time: calculateReadingTime(post.content),
			word_count: countWords(post.content)
		}));
		
		return {
			posts: postsWithMeta,
			tags,
			pagination: {
				current_page: page,
				has_next: posts.length === limit,
				has_prev: page > 1
			}
		};
	} catch (error) {
		console.error('Error loading homepage:', error);
		
		return {
			posts: [],
			tags: [],
			pagination: {
				current_page: 1,
				has_next: false,
				has_prev: false
			}
		};
	}
};