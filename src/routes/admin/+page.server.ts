import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db/connection.js';

export const load: PageServerLoad = async ({ locals }) => {
	// Require authentication
	if (!locals.user) {
		redirect(302, '/login');
	}

	// Optionally require admin role
	if (locals.user.role !== 'admin') {
		// If not admin, redirect to a public user page or home
		redirect(302, '/');
	}

	try {
		// Get dashboard metrics
		const postCountResult = (await db.query('SELECT count() FROM post GROUP ALL')) as any[];
		const postCount = postCountResult[0]?.[0]?.count || 0;

		const publishedCountResult = (await db.query(
			'SELECT count() FROM post WHERE published = true GROUP ALL'
		)) as any[];
		const publishedCount = publishedCountResult[0]?.[0]?.count || 0;

		const assetCountResult = (await db.query('SELECT count() FROM asset GROUP ALL')) as any[];
		const assetCount = assetCountResult[0]?.[0]?.count || 0;

		const tagCountResult = (await db.query('SELECT count() FROM tag GROUP ALL')) as any[];
		const tagCount = tagCountResult[0]?.[0]?.count || 0;

		// Get recent posts
		const recentPostsResult = (await db.query(
			'SELECT id, title, published, created_at, feature_image, IF(published = true, "published", "draft") as status FROM post ORDER BY updated_at DESC LIMIT 5'
		)) as any[];
		const recentPosts = (recentPostsResult[0] || []) as Array<{
			id: string;
			title: string;
			published: boolean;
			created_at: string;
			status: 'published' | 'draft';
			feature_image?: { url: string };
		}>;

		return {
			user: locals.user,
			metrics: {
				totalPosts: postCount,
				publishedPosts: publishedCount,
				draftPosts: postCount - publishedCount,
				totalAssets: assetCount,
				totalTags: tagCount
			},
			recentPosts
		};
	} catch (error) {
		console.error('Dashboard load error:', error);
		return {
			user: locals.user,
			metrics: {
				totalPosts: 0,
				publishedPosts: 0,
				draftPosts: 0,
				totalAssets: 0,
				totalTags: 0
			},
			recentPosts: []
		};
	}
};
