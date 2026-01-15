<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Container from '$lib/components/Container.svelte';

	export let data: PageData;

	$: ({ tag, posts, settings } = data);
</script>

<svelte:head>
	<title>{tag.name} - {settings.site_title}</title>
	<meta name="description" content={tag.description || `Artículos sobre ${tag.name}`} />
</svelte:head>

<!-- Breadcrumb Navigation -->
<nav class="breadcrumb-nav">
	<div class="breadcrumb-container">
		<a href="/" class="breadcrumb-link">Blog</a>
		<span class="breadcrumb-separator">/</span>
		<span class="breadcrumb-current">{tag.name}</span>
	</div>
</nav>

<!-- Separador Editorial -->
<div class="editorial-separator"></div>

<!-- Tag Header -->
<header class="tag-header">
	<div class="tag-header__container">
		<div class="tag-badge-wrapper">
			<span class="tag-badge" style="--tag-color: {tag.color || '#2563eb'}">
				{tag.name}
			</span>
		</div>

		<Heading level={1} class="tag-title">Artículos sobre {tag.name}</Heading>

		{#if tag.description}
			<p class="tag-description">{tag.description}</p>
		{/if}

		<div class="tag-stats">
			<span class="tag-stat">
				<span class="tag-stat__number">{posts.length}</span>
				<span class="tag-stat__label">
					{posts.length === 1 ? 'artículo' : 'artículos'}
				</span>
			</span>
		</div>
	</div>
</header>

<!-- Separador Editorial -->
<div class="editorial-separator"></div>

<!-- Posts: Modo Galería -->
<section class="posts-section">
	<Container size="wide" spacing="loose">
		{#if posts.length > 0}
			<div class="gallery-grid gallery-grid--posts">
				{#each posts as post (post.id)}
					<Card density="normal">
						{#snippet top()}
							{#if post.feature_image?.url}
								<img
									src={post.feature_image.url}
									alt={post.title || 'Sin título'}
									style="width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 4px; margin-bottom: var(--space-3);"
								/>
							{/if}
							{#if post.author?.name}
								<div
									style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2);"
								>
									{#if post.author.profile_image?.url}
										<img
											src={post.author.profile_image.url}
											alt={post.author.name}
											style="width: 20px; height: 20px; border-radius: 50%;"
										/>
									{:else}
										<div
											style="width: 20px; height: 20px; background: var(--color-primary); border-radius: 50%;"
										></div>
									{/if}
									<span
										style="font-size: var(--text-xs); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em;"
									>
										{post.author.name}
									</span>
								</div>
							{/if}
						{/snippet}
						{#snippet body()}
							{#if post.title}
								<a
									href={`/post/${post.slug || ''}`}
									style="text-decoration: none; color: var(--color-on-surface);"
								>
									<h3
										style="margin: 0 0 var(--space-2) 0; font-size: var(--text-lg); font-weight: 600; line-height: 1.2;"
									>
										{post.title}
									</h3>
								</a>
							{/if}
							{#if post.excerpt}
								<p
									style="margin: 0 0 var(--space-2) 0; font-size: var(--text-sm); color: var(--color-on-surface-variant); line-height: 1.5;"
								>
									{post.excerpt}
								</p>
							{/if}
						{/snippet}
						{#snippet footer()}
							<div
								style="display: flex; align-items: center; justify-content: space-between; font-size: var(--text-xs); color: var(--color-on-surface-variant);"
							>
								<div>
									{#if post.published_at}
										<time datetime={post.published_at}
											>{new Date(post.published_at).toLocaleDateString('es-ES', {
												year: 'numeric',
												month: 'short',
												day: 'numeric'
											})}</time
										>
									{/if}
									{#if post.reading_time}
										<span> • {post.reading_time} min</span>
									{/if}
								</div>
								{#if post.tags && post.tags.length > 0}
									<a
										href={`/tag/${post.tags[0].slug || ''}`}
										style="color: var(--color-primary); text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;"
									>
										{post.tags[0].name}
									</a>
								{/if}
							</div>
						{/snippet}
					</Card>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<div class="empty-state__content">
					<Heading level={2} class="empty-state__title">Sin artículos</Heading>
					<p class="empty-state__description">
						Aún no hay artículos publicados sobre {tag.name}. Vuelve pronto para ver más contenido.
					</p>
					<Pressable href="/" variant="ghost">← Volver al blog</Pressable>
				</div>
			</div>
		{/if}
	</Container>
</section>

<style>
	/* Breadcrumb - Refinado */
	:global(.breadcrumb-nav) {
		background: var(--bg-white);
		border-bottom: 1px solid var(--border-light);
		padding: var(--space-6) 0;
	}

	:global(.breadcrumb-container) {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: 0 var(--space-10);
		display: flex;
		align-items: center;
		gap: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	:global(.breadcrumb-link) {
		color: var(--text-primary);
		text-decoration: none;
		transition: color var(--duration-base) var(--ease-out);
	}

	:global(.breadcrumb-link:hover) {
		color: var(--accent-secondary);
	}

	:global(.breadcrumb-separator) {
		color: var(--border-light);
	}

	:global(.breadcrumb-current) {
		color: var(--text-secondary);
	}

	/* Separador Editorial */
	:global(.editorial-separator) {
		height: 2px;
		background: var(--border-light);
		margin: var(--space-20) 0;
		max-width: 200px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Tag Header - Más elegante y minimalista */
	:global(.tag-header) {
		background: var(--bg-cool);
		padding: var(--space-24) var(--space-10);
	}

	:global(.tag-header__container) {
		max-width: var(--container-base);
		margin: 0 auto;
		text-align: center;
	}

	:global(.tag-badge-wrapper) {
		margin-bottom: var(--space-8);
	}

	:global(.tag-badge) {
		display: inline-block;
		padding: var(--space-2) var(--space-4);
		background: var(--text-primary);
		color: white;
		border-radius: 1px;
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	:global(.tag-title) {
		font-family: var(--font-serif);
		font-size: clamp(32px, 5vw, 56px);
		font-weight: 600;
		line-height: var(--leading-tight);
		color: var(--text-primary);
		margin-bottom: var(--space-8);
	}

	:global(.tag-description) {
		font-family: var(--font-sans);
		font-size: var(--text-md);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		max-width: 700px;
		margin: 0 auto var(--space-16);
	}

	:global(.tag-stats) {
		display: flex;
		justify-content: center;
		gap: var(--space-16);
		flex-wrap: wrap;
	}

	:global(.tag-stat) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
	}

	:global(.tag-stat__number) {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--text-primary);
	}

	:global(.tag-stat__label) {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	/* Posts Section - Más generoso */
	:global(.posts-section) {
		padding: var(--space-24) var(--space-10);
		background: var(--bg-white);
	}

	:global(.gallery-grid--posts) {
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: var(--space-16);
	}

	/* Empty State */
	:global(.empty-state) {
		padding: var(--space-32) var(--space-10);
		text-align: center;
	}

	:global(.empty-state__content) {
		max-width: 500px;
		margin: 0 auto;
	}

	:global(.empty-state__title) {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-6);
	}

	:global(.empty-state__description) {
		font-family: var(--font-serif);
		font-size: var(--text-md);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		margin-bottom: var(--space-12);
	}

	/* Responsive */
	@media (max-width: 768px) {
		:global(.tag-header) {
			padding: var(--space-16) var(--space-6);
		}

		:global(.posts-section) {
			padding: var(--space-16) var(--space-6);
		}

		:global(.gallery-grid--posts) {
			grid-template-columns: 1fr;
			gap: var(--space-12);
		}

		:global(.breadcrumb-container) {
			padding: 0 var(--space-6);
			flex-wrap: wrap;
		}

		:global(.tag-title) {
			font-size: var(--text-2xl);
		}
	}
</style>
