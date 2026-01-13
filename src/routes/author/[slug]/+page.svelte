<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Container from '$lib/components/Container.svelte';

	let { data }: { data: PageData } = $props();

	// Declare reactive state
	let author = $derived(data.author);
	let posts = $derived(data.posts || []);
	let postCount = $derived(data.postCount || 0);
	let status = $derived(data.status);
	let isOwnProfile = $derived(data.user && data.user.slug === data.author?.slug);
	let safePostCount = $derived(postCount ?? 0);

	// Handle errors reactively
	$effect(() => {
		if (status === 404) {
			throw new Error('Author not found');
		}
		if (!author) {
			throw new Error('Author data is missing');
		}
	});
	
	// Show welcome message for own profile
	$effect(() => {
		if (isOwnProfile && typeof window !== 'undefined') {
			window.toast?.success(`Bienvenido a tu perfil, ${author!.name}!`);
		}
	});
</script>

<svelte:head>
	<title>{author!.name} - Arawi Aura</title>
	<meta name="description" content={author!.bio || `Artículos escritos por ${author!.name}`} />
</svelte:head>

<!-- Author Header -->
<header class="author-header">
	<Container size="base" spacing="loose">
		<div class="author-profile">
			{#if author!.profile_image?.url}
				<img 
					src={author!.profile_image.url}
					alt={author!.name}
					class="author-avatar"
					width="120"
					height="120"
				/>
			{:else}
				<div class="author-avatar-placeholder">
					<span class="author-initials">
						{author!.name.charAt(0).toUpperCase()}
					</span>
				</div>
			{/if}
			
			<div class="author-info">
				<Heading level={1} class="author-name">
					{author!.name}
					{#if isOwnProfile}
						<span class="own-profile-badge">
							✓ Tu perfil
						</span>
					{/if}
				</Heading>
				
				{#if author!.bio}
					<p class="author-bio">{author!.bio}</p>
				{/if}
				
				<div class="author-stats">
					<span class="stat-item">
						<span class="stat-number">{safePostCount}</span>
						<span class="stat-label">
							{postCount === 1 ? 'artículo' : 'artículos'}
						</span>
					</span>
					{#if author!.created_at}
						<span class="stat-divider">•</span>
						<span class="stat-item">
							<span class="stat-label">Desde</span>
							<span class="stat-number">
								{new Date(author!.created_at).getFullYear()}
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
				Artículos de {author!.name}
			</Heading>
			{#if safePostCount > 0}
				<p class="section-subtitle">
					Explora los {safePostCount} artículos escritos por {author!.name}
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
						{author!.name} aún no ha publicado ningún artículo. ¡Vuelve pronto!
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
	/* Author Header - Architectural Outline Style */
	.author-header {
		background: var(--color-surface-container-low);
		border-bottom: var(--line-thin) solid var(--stroke-subtle);
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
		border: var(--line-base) solid var(--stroke-medium);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.author-avatar-placeholder {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		border: var(--line-base) solid var(--color-primary);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.author-initials {
		font-family: var(--font-sans);
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-on-primary);
		line-height: 1;
	}

	/* Author name styled via Heading component */

	.author-bio {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		line-height: var(--leading-relaxed);
		color: var(--color-on-surface-variant);
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
		padding: var(--space-3) var(--space-4);
		background-color: var(--color-surface-container-lowest);
		border: var(--line-thin) solid var(--stroke-subtle);
		border-radius: clamp(4px, 1vw, 8px);
	}

	.stat-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.stat-number {
		font-weight: 700;
		color: var(--color-primary);
		font-size: var(--text-base);
	}

	.stat-label {
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		font-size: var(--text-xs);
		letter-spacing: 0.05em;
		font-weight: 500;
	}

	.stat-divider {
		color: var(--stroke-subtle);
		font-weight: 600;
	}

	/* Posts Section */
	.author-posts {
		background-color: var(--color-surface);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-12);
		padding: var(--space-4);
	}

	.section-subtitle {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--color-on-surface-variant);
		max-width: 600px;
		margin: var(--space-4) auto 0;
		line-height: var(--leading-relaxed);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-8);
	}

	/* Empty State */
	:global(.empty-state) {
		text-align: center;
		padding: var(--space-20) var(--space-4);
		background-color: var(--color-surface-container-lowest);
		border: var(--line-thin) dashed var(--stroke-subtle);
		border-radius: clamp(8px, 2vw, 12px);
	}

	:global(.empty-state__content) {
		max-width: 500px;
		margin: 0 auto;
	}

	:global(.empty-state__title) {
		font-family: var(--font-sans);
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--color-on-surface);
		margin-bottom: var(--space-4);
		line-height: var(--leading-tight);
	}

	:global(.empty-state__description) {
		font-family: var(--font-serif);
		font-size: var(--text-md);
		line-height: var(--leading-relaxed);
		color: var(--color-on-surface-variant);
		margin-bottom: var(--space-8);
	}

	/* Own Profile Indicator */
	.own-profile-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1) var(--space-3);
		background-color: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border: var(--line-thin) solid var(--color-primary);
		border-radius: clamp(4px, 1vw, 8px);
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 600;
		margin-top: var(--space-2);
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

		.author-stats {
			padding: var(--space-2) var(--space-3);
		}

		.posts-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		:global(.empty-state) {
			padding: var(--space-16) var(--space-3);
		}

		.section-header {
			margin-bottom: var(--space-8);
		}
	}

	@media (max-width: 480px) {
		.author-profile {
			gap: var(--space-6);
		}

		.author-avatar,
		.author-avatar-placeholder {
			width: 80px;
			height: 80px;
		}

		.author-initials {
			font-size: var(--text-xl);
		}
	}
</style>