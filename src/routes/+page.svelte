<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	$: ({ posts, settings } = data);
</script>

<svelte:head>
	<title>{settings.site_title}</title>
	<meta name="description" content={settings.site_description} />
</svelte:head>

<!-- Posts con layout simple -->
<section class="posts-section">
	{#each posts as post (post.id)}
		<article class="linear-post">
			<header class="linear-post__header">
				<div class="linear-post__meta-line"></div>

				<h2 class="linear-post__title">
					<a href={`/post/${post.slug || ''}`}>{post.title || 'Sin título'}</a>
				</h2>

				<div class="linear-post__metadata">
					{#if post.published_at}
						<time datetime={post.published_at} class="metadata-item">
							{new Date(post.published_at).toLocaleDateString('es-ES', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
						<span class="metadata-divider">•</span>
					{/if}
					<span class="metadata-item">{post.reading_time} min</span>
					{#if post.author}
						<span class="metadata-divider">•</span>
						<span class="metadata-item">{post.author.name}</span>
					{/if}
				</div>
			</header>

			{#if post.excerpt}
				<p class="linear-post__excerpt">{post.excerpt}</p>
			{/if}

			<a href={`/post/${post.slug || ''}`} class="linear-post__link">Leer más →</a>

			<div class="linear-separator"></div>
		</article>
	{/each}

	{#if posts.length === 0}
		<p class="empty-state">No hay posts aún.</p>
	{/if}
</section>

<style>
	.posts-section {
		max-width: var(--container-narrow);
		margin: 0 auto;
		padding: var(--space-16) var(--space-8);
	}

	.linear-post {
		margin-bottom: var(--space-16);
	}

	.linear-post:last-child .linear-separator {
		display: none;
	}

	.linear-post__header {
		margin-bottom: var(--space-6);
	}

	.linear-post__meta-line {
		height: var(--line-thin);
		background: var(--border-light);
		margin-bottom: var(--space-4);
	}

	.linear-post__title {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 600;
		line-height: var(--leading-tight);
		margin-bottom: var(--space-3);
	}

	.linear-post__title a {
		color: var(--text-primary);
		text-decoration: none;
	}

	.linear-post__title a:hover {
		color: var(--text-secondary);
	}

	.linear-post__metadata {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.metadata-divider {
		color: var(--border-medium);
	}

	.linear-post__excerpt {
		font-family: var(--font-serif);
		font-size: var(--text-base);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		margin-bottom: var(--space-4);
	}

	.linear-post__link {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--text-primary);
		text-decoration: none;
		border-bottom: 1px solid var(--border-light);
		transition: all var(--duration-fast) var(--ease-out);
	}

	.linear-post__link:hover {
		color: var(--text-secondary);
		border-bottom-color: var(--text-secondary);
	}

	.linear-separator {
		height: var(--line-thin);
		background: var(--border-light);
		margin: var(--space-12) 0;
	}

	.empty-state {
		text-align: center;
		font-family: var(--font-serif);
		color: var(--text-muted);
		padding: var(--space-16) 0;
	}

	@media (max-width: 768px) {
		.posts-section {
			padding: var(--space-12) var(--space-4);
		}

		.linear-post__title {
			font-size: var(--text-xl);
		}
	}
</style>
