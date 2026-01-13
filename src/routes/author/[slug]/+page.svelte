<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Container from '$lib/components/Container.svelte';

	export let data: PageData;

	// Access data directly without reactivity
	const author = data.author;
	const posts = data.posts || [];
	const postCount = data.postCount || 0;
	const status = data.status;
	
	// Handle 404 case
	if (status === 404) {
		// This will be handled by SvelteKit's error handling
		throw new Error('Author not found');
	}
	
	// Guard clauses for type safety
	if (!author) {
		throw new Error('Author data is missing');
	}
	
	const safePostCount = postCount ?? 0;
</script>

<svelte:head>
	<title>{author.name} - Arawi Aura</title>
	<meta name="description" content={author.bio || `Artículos escritos por ${author.name}`} />
</svelte:head>

<!-- Author Header -->
<header class="author-header">
	<Container size="base" spacing="loose">
		<div class="author-profile">
			{#if author.profile_image?.url}
				<img 
					src={author.profile_image.url} 
					alt={author.name}
					class="author-avatar"
					width="120"
					height="120"
				/>
			{:else}
				<div class="author-avatar-placeholder">
					<span class="author-initials">
						{author.name.charAt(0).toUpperCase()}
					</span>
				</div>
			{/if}
			
			<div class="author-info">
				<Heading level={1} class="author-name">
					{author.name}
				</Heading>
				
				{#if author.bio}
					<p class="author-bio">{author.bio}</p>
				{/if}
				
				<div class="author-stats">
					<span class="stat-item">
						<span class="stat-number">{postCount}</span>
						<span class="stat-label">
							{postCount === 1 ? 'artículo' : 'artículos'}
						</span>
					</span>
					{#if author.created_at}
						<span class="stat-divider">•</span>
						<span class="stat-item">
							<span class="stat-label">Desde</span>
							<span class="stat-number">
								{new Date(author.created_at).getFullYear()}
							</span>
						</span>
					{/if}
				</div>
			</div>
		</div>
	</Container>
</header>

<!-- Author Posts -->
<section class="author-posts">
	<Container size="base" spacing="normal">
		<div class="section-header">
			<Heading level={2}>
				Artículos de {author.name}
			</Heading>
			{#if safePostCount > 0}
				<p class="section-subtitle">
					Explora los {safePostCount} artículos escritos por {author.name}
				</p>
			{/if}
		</div>

		{#if safePostCount > 0}
			<div class="posts-grid">
				{#each posts as post (post.id)}
					<Card
						title={post.title || 'Sin título'}
						url={`/post/${post.slug || ''}`}
						excerpt={post.excerpt || ''}
						featureImage={post.feature_image?.url || ''}
						authorName={post.author?.name || ''}
						authorUrl={post.author ? `/author/${post.author.slug || ''}` : ''}
						authorProfileImage={post.author?.profile_image?.url || ''}
						tagName={post.tags && post.tags.length > 0 ? post.tags[0].name || '' : ''}
						tagUrl={post.tags && post.tags.length > 0 ? `/tag/${post.tags[0].slug || ''}` : ''}
						readingTime={`${post.reading_time || 0} min`}
						publishedAt={post.published_at || ''}
						density="normal"
					/>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<div class="empty-state__content">
					<Heading level={3} class="empty-state__title">
						Sin artículos aún
					</Heading>
					<p class="empty-state__description">
						{author.name} aún no ha publicado ningún artículo. ¡Vuelve pronto!
					</p>
					<Pressable href="/" variant="ghost">
						Volver al blog
					</Pressable>
				</div>
			</div>
		{/if}
	</Container>
</section>

<style>
	/* Author Header */
	.author-header {
		background: var(--bg-cool);
	}

	.author-profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-8);
	}

	.author-avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid var(--border-light);
	}

	.author-avatar-placeholder {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 4px solid var(--border-light);
	}

	.author-initials {
		font-family: var(--font-sans);
		font-size: var(--text-3xl);
		font-weight: 700;
		color: white;
	}



	.author-bio {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		max-width: 600px;
		margin-bottom: var(--space-6);
	}

	.author-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		flex-wrap: wrap;
		font-family: var(--font-sans);
	}

	.stat-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.stat-number {
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		color: var(--text-secondary);
		text-transform: uppercase;
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-wide);
	}

	.stat-divider {
		color: var(--border-light);
	}

	/* Posts Section */
	.section-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.section-subtitle {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--text-secondary);
		max-width: 600px;
		margin: var(--space-4) auto 0;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-8);
	}

	/* Empty State */
	:global(.empty-state) {
		text-align: center;
		padding: var(--space-20) 0;
	}

	:global(.empty-state__content) {
		max-width: 500px;
		margin: 0 auto;
	}

	:global(.empty-state__title) {
		font-family: var(--font-sans);
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	:global(.empty-state__description) {
		font-family: var(--font-serif);
		font-size: var(--text-md);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		margin-bottom: var(--space-8);
	}

	/* Responsive */
	@media (min-width: 768px) {
		.author-profile {
			flex-direction: row;
			text-align: left;
			gap: var(--space-12);
		}

		.author-info {
			text-align: left;
		}
	}

	@media (max-width: 768px) {
		.author-avatar,
		.author-avatar-placeholder {
			width: 90px;
			height: 90px;
		}

		.author-initials {
			font-size: var(--text-2xl);
		}

		

		.posts-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		:global(.empty-state) {
			padding: var(--space-16) 0;
		}
	}
</style>