<script lang="ts">
	import type { PageData } from './$types';
	import Sidenote from '$lib/components/Sidenote.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	$: ({ post, settings } = data);

	// Formateador de fecha seguro
	$: formattedDate = post.published_at
		? new Date(post.published_at).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		: '';
</script>

<svelte:head>
	<title>{post.title} - {settings.site_title}</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<!-- Hero Visual Editorial -->
<article class="linear-article">
	<!-- Header minimalista -->
	<header class="linear-article__header">
		<div class="linear-article__meta-line"></div>

		<h1 class="linear-article__title">
			{post.title}
		</h1>

		{#if post.excerpt}
			<p class="linear-article__excerpt">
				{post.excerpt}
			</p>
		{/if}

		<!-- Metadata en monoespaciado -->
		<div class="linear-article__metadata">
			{#if post.published_at}
				<time datetime={post.published_at} class="metadata-item">
					{formattedDate}
				</time>
				<span class="metadata-divider">•</span>
			{/if}
			<span class="metadata-item">
				{post.reading_time} min
			</span>
			{#if post.author}
				<span class="metadata-divider">•</span>
				<span class="metadata-item">
					{post.author.name}
				</span>
			{/if}
		</div>
	</header>

	<!-- Separador estructural -->
	<div class="linear-separator linear-separator--thick"></div>

	<!-- Contenido con tipografía serif -->
	<div class="linear-article__content">
		{@html post.html || post.content}
	</div>

	<!-- Separador final -->
	<div class="linear-separator"></div>
</article>

<style>
	.linear-article {
		max-width: var(--container-narrow);
		margin: 0 auto;
		padding: var(--space-16) var(--space-8);
	}

	.linear-article__header {
		margin-bottom: var(--space-16);
	}

	.linear-article__meta-line {
		height: var(--line-thin);
		background: var(--border-light);
		margin-bottom: var(--space-8);
	}

	.linear-article__title {
		font-family: var(--font-serif);
		font-size: var(--text-3xl);
		font-weight: 600;
		line-height: var(--leading-tight);
		margin-bottom: var(--space-6);
		color: var(--text-primary);
	}

	.linear-article__excerpt {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		margin-bottom: var(--space-8);
	}

	.linear-article__metadata {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.linear-separator {
		height: var(--line-thin);
		background: var(--border-light);
		margin: var(--space-12) 0;
	}

	.linear-separator--thick {
		height: var(--line-base);
	}

	.linear-article__content {
		font-family: var(--font-serif);
		font-size: var(--text-md);
		line-height: var(--leading-loose);
		color: var(--text-primary);
	}
</style>
