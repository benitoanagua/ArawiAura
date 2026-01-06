<script lang="ts">
	import type { PageData } from './$types';
	import Sidenote from '$lib/components/Sidenote.svelte';
	import Button from '$lib/components/Button.svelte';
	
	export let data: PageData;
	
	$: ({ post, settings } = data);
</script>

<svelte:head>
	<title>{post.title} - {settings.site_title}</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<!-- Hero Visual Editorial -->
<header class="article-hero">
	{#if post.feature_image}
		<div class="article-hero__image">
			<img src={post.feature_image.url} alt={post.feature_image.alt || post.title} />
		</div>
	{/if}
	<div class="article-hero__overlay"></div>
	<div class="article-hero__content">
		<h1 class="article-hero__title">{post.title}</h1>
		{#if post.excerpt}
			<p class="article-hero__excerpt">{post.excerpt}</p>
		{/if}
	</div>
</header>

<!-- Separador Editorial -->
<div class="editorial-separator article-separator"></div>

<!-- Article Layout: Modo Lectura -->
<article class="article-layout">
	<!-- Article Header Metadata -->
	<header class="article-header">
		<div class="article-metadata">
			{#if post.published_at}
				<time datetime={post.published_at} class="article-metadata__date">
					{new Date(post.published_at).toLocaleDateString('es-ES', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			{/if}

			{#if post.author?.name}
				<span class="article-metadata__author">
					Escrito por {post.author.name}
				</span>
			{/if}

			{#if post.reading_time}
				<span class="article-metadata__reading-time">
					{post.reading_time} minutos de lectura
				</span>
			{/if}
		</div>

		<!-- Tags -->
		{#if post.tags && post.tags.length > 0}
			<nav class="article-tags">
				{#each post.tags as tag}
					<a href={`/tag/${tag.slug}`} class="article-tag">
						{tag.name}
					</a>
				{/each}
			</nav>
		{/if}
	</header>

	<!-- Article Body -->
	<div class="article-content">
		{@html post.content_html || post.content}
	</div>

	<!-- Separador Final -->
	<div class="article-footer-separator"></div>

	<!-- Article Footer -->
	<footer class="article-footer">
		{#if post.author?.bio}
			<div class="author-bio">
				<h3 class="author-bio__title">Sobre el autor</h3>
				<p class="author-bio__text">{post.author.bio}</p>
			</div>
		{/if}
	</footer>
</article>

<!-- Separador Editorial -->
<div class="editorial-separator"></div>

<!-- Navigation -->
<nav class="article-navigation">
	<div class="article-navigation__container">
		<Button 
			href="/"
			variant="ghost"
			class="article-navigation__btn"
		>
			← Volver al blog
		</Button>
	</div>
</nav>

<style>
	/* Hero Editorial */
	:global(.article-hero) {
		position: relative;
		height: clamp(400px, 60vh, 600px);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		overflow: hidden;
		background: var(--bg-cool);
	}

	:global(.article-hero__image) {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	:global(.article-hero__image img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	:global(.article-hero__overlay) {
		position: absolute;
		inset: 0;
		z-index: 2;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.5) 100%
		);
	}

	:global(.article-hero__content) {
		position: relative;
		z-index: 3;
		color: white;
		text-align: center;
		padding: var(--space-12);
		max-width: 900px;
	}

	:global(.article-hero__title) {
		font-family: var(--font-serif);
		font-size: clamp(32px, 6vw, 56px);
		font-weight: 700;
		line-height: var(--leading-tight);
		margin-bottom: var(--space-6);
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	:global(.article-hero__excerpt) {
		font-family: var(--font-sans);
		font-size: clamp(18px, 2vw, 24px);
		line-height: var(--leading-snug);
		font-weight: 400;
		opacity: 0.95;
	}

	/* Separador Editorial */
	:global(.article-separator) {
		margin: var(--space-16) auto;
	}

	/* Article Layout */
	:global(.article-layout) {
		max-width: var(--container-narrow);
		margin: 0 auto;
		padding: 0 var(--space-10);
	}

	/* Article Header */
	:global(.article-header) {
		margin-bottom: var(--space-20);
		padding-bottom: var(--space-12);
		border-bottom: 1px solid var(--border-light);
	}

	/* Metadata */
	:global(.article-metadata) {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6);
		margin-bottom: var(--space-8);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	:global(.article-metadata__date) {
		color: var(--text-secondary);
	}

	:global(.article-metadata__author),
	:global(.article-metadata__reading-time) {
		color: var(--accent-primary);
	}

	/* Tags */
	:global(.article-tags) {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	:global(.article-tag) {
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

	:global(.article-tag:hover) {
		background: var(--accent-primary);
		color: white;
		border-color: var(--accent-primary);
	}

	/* Content */
	:global(.article-content) {
		font-family: var(--font-serif);
		font-size: var(--text-md);
		line-height: var(--leading-loose);
		color: var(--text-primary);
		margin-bottom: var(--space-20);
	}

	/* Headings dentro del contenido */
	:global(.article-content h1) {
		font-family: var(--font-serif);
		font-size: var(--text-3xl);
		font-weight: 700;
		line-height: var(--leading-tight);
		margin-top: var(--space-20);
		margin-bottom: var(--space-8);
		color: var(--text-primary);
	}

	:global(.article-content h2) {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 700;
		line-height: var(--leading-tight);
		margin-top: var(--space-16);
		margin-bottom: var(--space-6);
		color: var(--text-primary);
	}

	:global(.article-content h3) {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		font-weight: 600;
		line-height: var(--leading-snug);
		margin-top: var(--space-12);
		margin-bottom: var(--space-4);
		color: var(--text-primary);
	}

	:global(.article-content p) {
		margin-bottom: var(--space-6);
	}

	:global(.article-content blockquote) {
		border-left: 4px solid var(--accent-primary);
		padding-left: var(--space-6);
		margin: var(--space-12) 0;
		font-style: italic;
		color: var(--text-secondary);
	}

	:global(.article-content code) {
		background: var(--bg-cool);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--border-radius-sm);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--text-primary);
	}

	:global(.article-content pre) {
		background: var(--bg-dark);
		color: var(--bg-white);
		padding: var(--space-6);
		border-radius: var(--border-radius-base);
		overflow-x: auto;
		margin: var(--space-12) 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
	}

	:global(.article-content pre code) {
		background: transparent;
		padding: 0;
		color: inherit;
	}

	:global(.article-content ul),
	:global(.article-content ol) {
		margin-left: var(--space-6);
		margin-bottom: var(--space-6);
	}

	:global(.article-content li) {
		margin-bottom: var(--space-2);
	}

	:global(.article-content img) {
		max-width: 100%;
		height: auto;
		margin: var(--space-12) 0;
		border-radius: var(--border-radius-base);
	}

	:global(.article-content figcaption) {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--text-muted);
		text-align: center;
		margin-top: var(--space-3);
	}

	:global(.article-content a) {
		color: var(--accent-primary);
		text-decoration: underline;
		transition: color var(--duration-fast) var(--ease-out);
	}

	:global(.article-content a:hover) {
		color: var(--accent-primary-hover);
	}

	/* Footer Separator */
	:global(.article-footer-separator) {
		height: 1px;
		background: var(--border-light);
		margin: var(--space-20) 0;
	}

	/* Article Footer */
	:global(.article-footer) {
		margin-bottom: var(--space-20);
	}

	:global(.author-bio) {
		background: var(--bg-warm);
		padding: var(--space-8);
		border-radius: var(--border-radius-base);
		border-left: 4px solid var(--accent-primary);
	}

	:global(.author-bio__title) {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	:global(.author-bio__text) {
		font-family: var(--font-serif);
		font-size: var(--text-base);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
	}

	/* Navigation */
	:global(.article-navigation) {
		background: var(--bg-cool);
		padding: var(--space-12) var(--space-10);
		border-top: 1px solid var(--border-light);
		border-bottom: 1px solid var(--border-light);
	}

	:global(.article-navigation__container) {
		max-width: var(--container-base);
		margin: 0 auto;
	}

	:global(.article-navigation__btn) {
		font-family: var(--font-sans);
		font-size: var(--text-base);
		font-weight: 500;
		color: var(--accent-primary);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	:global(.article-navigation__btn:hover) {
		text-decoration: underline;
	}

	/* Responsive */
	@media (max-width: 768px) {
		:global(.article-layout) {
			padding: 0 var(--space-6);
		}

		:global(.article-metadata) {
			gap: var(--space-3);
			font-size: var(--text-xs);
		}

		:global(.article-content) {
			font-size: var(--text-base);
		}

		:global(.article-content h1) {
			font-size: var(--text-2xl);
		}

		:global(.article-content h2) {
			font-size: var(--text-xl);
		}
	}
</style>
