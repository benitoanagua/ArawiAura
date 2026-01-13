import { getTagBySlug } from '$lib/db/tags.js';
import { getPostsByTag } from '$lib/db/posts.js';
import { calculateReadingTime, countWords } from '$lib/utils/markdown.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const [tag, posts] = await Promise.all([
			getTagBySlug(params.slug),
			getPostsByTag(params.slug, 20)
		]);
		
		if (!tag) {
			throw error(404, 'Tag no encontrado');
		}
		
		// Agregar metadatos a los posts
		const postsWithMeta = posts.map(post => ({
			...post,
			reading_time: calculateReadingTime(post.content),
			word_count: countWords(post.content)
		}));
		
		return {
			tag,
			posts: postsWithMeta
		};
	} catch (err) {
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		
		console.error('Error loading tag page:', err);
		throw error(500, 'Error interno del servidor');
	}
};