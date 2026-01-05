import { getPostBySlug } from '$lib/db/queries.js';
import { calculateReadingTime, countWords } from '$lib/utils/markdown.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = await getPostBySlug(params.slug);
		
		if (!post) {
			throw error(404, 'Post no encontrado');
		}
		
		if (post.status !== 'published') {
			throw error(404, 'Post no disponible');
		}
		
		// Agregar metadatos
		const postWithMeta = {
			...post,
			reading_time: calculateReadingTime(post.content),
			word_count: countWords(post.content)
		};
		
		return {
			post: postWithMeta
		};
	} catch (err) {
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		
		console.error('Error loading post:', err);
		throw error(500, 'Error interno del servidor');
	}
};