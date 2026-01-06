<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Hero from '$lib/components/Hero.svelte';
	
	export let data: PageData;
	
	$: ({ posts, tags, pagination, settings } = data);
</script>

<svelte:head>
	<title>{settings.site_title} - Blog</title>
	<meta name="description" content={settings.site_description} />
</svelte:head>

<!-- Hero Editorial Section -->
<Hero 
	title="Arawi Aura"
	subtitle="Un blog sobre diseño, tecnología y creatividad"
	size="xl"
	variant="center"
/>

<!-- Separador Editorial -->
<div class="editorial-separator"></div>

<!-- Modo Galería: Tags / Temas -->
{#if tags && tags.length > 0}
	<section class="editorial-section bg-warm">
		<div class="container container--wide">
			<header class="editorial-section__header">
				<h2 class="editorial-heading editorial-heading--secondary">Explorar por temas</h2>
				<p class="editorial-subtext">Descubre contenido agrupado por categorías y áreas de interés</p>
			</header>

			<div class="gallery-grid gallery-grid--tags">
				{#each tags as tag (tag.id)}
					<Card
						variant="tag"
						title={tag.name}
						caption={`${(tag as any).post_count || 0} ${(tag as any).post_count === 1 ? 'artículo' : 'artículos'}`}
						href={`/tag/${tag.slug}`}
					/>
				{/each}
			</div>
		</div>
	</section>

	<!-- Separador Editorial -->
	<div class="editorial-separator"></div>
{/if}

<!-- Modo Lectura: Posts Recientes -->
<section class="editorial-section bg-white">
	<div class="container container--narrow">
		<header class="editorial-section__header">
			<h2 class="editorial-heading editorial-heading--primary">Posts recientes</h2>
			<p class="editorial-subtext">Artículos ordenados por fecha de publicación</p>
		</header>

		<div class="posts-list">
			{#each posts as post (post.id)}
				<article class="post-preview">
					<header class="post-preview__header">
						<h3 class="post-preview__title">
							<a href={`/post/${post.slug || ''}`}>{post.title || 'Sin título'}</a>
						</h3>
						<div class="post-preview__metadata">
							<time datetime={post.published_at} class="post-preview__date">
								{new Date(post.published_at || '').toLocaleDateString('es-ES', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
							{#if post.author?.name}
								<span class="post-preview__author">Por {post.author.name}</span>
							{/if}
							{#if post.reading_time}
								<span class="post-preview__reading-time">{post.reading_time} min</span>
							{/if}
						</div>
					</header>

					{#if post.excerpt}
						<p class="post-preview__excerpt">{post.excerpt}</p>
					{/if}

					{#if post.tags && post.tags.length > 0}
						<div class="post-preview__tags">
							{#each post.tags as tag}
								<a href={`/tag/${tag.slug}`} class="tag-chip">
									{tag.name}
								</a>
							{/each}
						</div>
					{/if}

					<a href={`/post/${post.slug || ''}`} class="post-preview__link">
						Leer artículo →
					</a>
				</article>

				<!-- Separador entre posts -->
				{#if posts.indexOf(post) < posts.length - 1}
					<div class="post-divider"></div>
				{/if}
			{/each}
		</div>

		<!-- Pagination Controls -->
		{#if pagination.has_prev || pagination.has_next}
			<nav class="pagination-nav">
				<div class="pagination-info">
					<span class="pagination-text font-mono text-sm text-muted">
						Página {pagination.current_page} de {pagination.total_pages || pagination.current_page + 1}
					</span>
				</div>

				<div class="pagination-controls">
					{#if pagination.has_prev}
						<Button 
							href={`?page=${pagination.current_page - 1}`}
							variant="ghost"
							class="pagination-btn"
						>
							← Anterior
						</Button>
					{/if}

					{#if pagination.has_next}
						<Button 
							href={`?page=${pagination.current_page + 1}`}
							variant="ghost"
							class="pagination-btn"
						>
							Siguiente →
						</Button>
					{/if}
				</div>
			</nav>
		{/if}
	</div>
</section>

<style>
	/* Separadores Editoriales */
	:global(.editorial-separator) {
		height: 4px;
		background: linear-gradient(to right, 
			var(--border-light) 0%, 
			var(--text-muted) 50%, 
			var(--border-light) 100%);
		margin: var(--space-24) 0;
		max-width: 200px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Sections */
	:global(.editorial-section) {
		padding: var(--space-24) var(--space-10);
	}

	:global(.editorial-section__header) {
		text-align: center;
		margin-bottom: var(--space-20);
	}

	/* Headings editoriales */
	:global(.editorial-heading) {
		font-family: var(--font-sans);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	:global(.editorial-heading--primary) {
		font-size: clamp(32px, 5vw, 56px);
		line-height: var(--leading-tight);
	}

	:global(.editorial-heading--secondary) {
		font-size: clamp(28px, 4vw, 48px);
		line-height: var(--leading-tight);
	}

	:global(.editorial-subtext) {
		font-family: var(--font-sans);
		font-size: var(--text-md);
		color: var(--text-secondary);
		line-height: var(--leading-normal);
		font-weight: 400;
	}

	/* Gallery Grid para Tags */
	:global(.gallery-grid--tags) {
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-12);
	}

	/* Posts List (Modo Lectura) */
	:global(.posts-list) {
		display: flex;
		flex-direction: column;
		gap: var(--space-16);
	}

	:global(.post-preview) {
		padding: var(--space-12) 0;
	}

	:global(.post-preview__header) {
		margin-bottom: var(--space-6);
	}

	:global(.post-preview__title) {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 700;
		line-height: var(--leading-tight);
		margin-bottom: var(--space-3);
		color: var(--text-primary);
	}

	:global(.post-preview__title a) {
		color: inherit;
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	:global(.post-preview__title a:hover) {
		color: var(--accent-primary);
	}

	:global(.post-preview__metadata) {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	:global(.post-preview__date) {
		color: var(--text-secondary);
	}

	:global(.post-preview__author),
	:global(.post-preview__reading-time) {
		color: var(--accent-primary);
	}

	:global(.post-preview__excerpt) {
		font-family: var(--font-serif);
		font-size: var(--text-md);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		margin-bottom: var(--space-6);
	}

	:global(.post-preview__tags) {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	:global(.tag-chip) {
		display: inline-block;
		padding: var(--space-2) var(--space-3);
		background: var(--bg-cool);
		color: var(--text-secondary);
		border: 1px solid var(--border-light);
		border-radius: var(--border-radius-base);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-decoration: none;
		transition: all var(--duration-fast) var(--ease-out);
	}

	:global(.tag-chip:hover) {
		background: var(--accent-primary);
		color: white;
		border-color: var(--accent-primary);
	}

	:global(.post-preview__link) {
		display: inline-block;
		color: var(--accent-primary);
		font-family: var(--font-sans);
		font-weight: 500;
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	:global(.post-preview__link:hover) {
		text-decoration: underline;
	}

	:global(.post-divider) {
		height: 1px;
		background: var(--border-light);
		margin: var(--space-12) 0;
	}

	/* Pagination */
	:global(.pagination-nav) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-8);
		margin-top: var(--space-20);
		padding-top: var(--space-12);
		border-top: 1px solid var(--border-light);
	}

	:global(.pagination-info) {
		flex: 1;
	}

	:global(.pagination-text) {
		color: var(--text-muted);
	}

	:global(.pagination-controls) {
		display: flex;
		gap: var(--space-4);
	}

	:global(.pagination-btn) {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--accent-primary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		:global(.editorial-section) {
			padding: var(--space-16) var(--space-6);
		}

		:global(.editorial-section__header) {
			margin-bottom: var(--space-12);
		}

		:global(.pagination-nav) {
			flex-direction: column;
			align-items: flex-start;
		}

		:global(.pagination-controls) {
			width: 100%;
		}
	}
</style>
