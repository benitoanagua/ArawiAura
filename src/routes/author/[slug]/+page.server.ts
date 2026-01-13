import { getUserBySlug } from '$lib/db/users.js';
import { getPublishedPostsByAuthor } from '$lib/db/posts.js';
import { calculateReadingTime, countWords } from '$lib/utils/markdown.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { slug } = params;
		
		// Get author data
		const author = await getUserBySlug(slug);
		
		if (!author) {
			throw error(404, 'Author not found');
		}
		
		// Get author's posts
		const posts = await getPublishedPostsByAuthor(slug, 20, 0);
		
		// Add metadata to posts
		const postsWithMeta = posts.map(post => ({
			...post,
			reading_time: calculateReadingTime(post.content || ''),
			word_count: countWords(post.content || '')
		}));
		
		return {
			author,
			posts: postsWithMeta,
			postCount: posts.length
		};
	} catch (error) {
		console.error('Error loading author page:', error);
		
		return {
			status: 500,
			error: 'Failed to load author data'
		};
	}
};