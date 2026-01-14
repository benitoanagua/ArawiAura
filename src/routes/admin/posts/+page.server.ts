import { getDB } from '$lib/db/connection';
import type { PageServerLoad } from './$types';

interface Post {
	id: string;
	title: string;
	slug: string;
	excerpt?: string;
	status: 'draft' | 'published';
	created_at: string;
	feature_image?: { url: string };
	tags?: Array<{ id: string; name: string; slug: string }>;
}

interface Tag {
	id: string;
	name: string;
	slug: string;
}

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const db = await getDB();

		// Get posts with author and tags
		const posts = await db.query(`
			SELECT 
				id,
				title,
				slug,
				excerpt,
				status,
				created_at,
				feature_image,
				tags.* as tags
			FROM post 
			ORDER BY created_at DESC
		`);

		// Get tags for filter dropdown
		const tags = await db.query(`
			SELECT id, name, slug 
			FROM tag 
			ORDER BY name ASC
		`);

		// Return data
		return {
			posts: (Array.isArray(posts) && posts.length > 0
				? (posts[0] as any).result || []
				: []) as Post[],
			tags: (Array.isArray(tags) && tags.length > 0 ? (tags[0] as any).result || [] : []) as Tag[]
		};
	} catch (error) {
		console.error('Error loading posts:', error);
		return {
			posts: [] as Post[],
			tags: [] as Tag[]
		};
	}
};
