// ============================================
// TIPOS PARA ARAWI AURA BLOG
// ============================================

export interface User {
	id: string;
	name: string;
	slug: string;
	email: string;
	password_hash: string;
	bio: string;
	profile_image?: Asset;
	created_at: string;
}

export interface Post {
	id: string;
	title: string;
	slug: string;
	content: string;        // Markdown
	html: string;           // HTML renderizado
	excerpt?: string;
	feature_image?: Asset;
	status: 'draft' | 'published';
	published_at?: string;
	created_at: string;
	updated_at: string;
	author: User;
	tags: Tag[];
}

export interface Tag {
	id: string;
	name: string;
	slug: string;
	description?: string;
	color?: string;
	created_at: string;
}

export interface Asset {
	id: string;
	url: string;
	alt?: string;
	width?: number;
	height?: number;
	size?: number;
	mime_type?: string;
	created_at: string;
}

export interface Setting {
	id: string;
	value: any;
}

// ============================================
// TIPOS PARA FORMULARIOS Y REQUESTS
// ============================================

export interface CreatePostData {
	title: string;
	slug: string;
	content: string;
	excerpt?: string;
	feature_image?: string;
	status: 'draft' | 'published';
	published_at?: string;
	author: string;
	tags: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
	id: string;
	updated_at: string;
}

export interface CreateTagData {
	name: string;
	slug: string;
	description?: string;
	color?: string;
}

export interface BlogSettings {
	site_title: string;
	site_description: string;
	site_url: string;
	posts_per_page: number;
	theme: string;
}

// ============================================
// TIPOS PARA QUERIES
// ============================================

export interface PostsQuery {
	status?: 'draft' | 'published';
	tag?: string;
	author?: string;
	limit?: number;
	offset?: number;
	search?: string;
}

export interface PostWithMeta extends Post {
	reading_time?: number;
	word_count?: number;
}