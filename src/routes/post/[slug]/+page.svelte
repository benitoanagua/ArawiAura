<script lang="ts">
	import type { PageData } from './$types';

	import Card from '$lib/components/Card.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Container from '$lib/components/Container.svelte';

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

	// Simulate related posts (in a real app, this would come from the server)
	const relatedPosts = [
		{
			title: 'Understanding Typography in Web Design',
			slug: 'typography-in-web-design',
			excerpt:
				'A deep dive into the principles of typography and how they apply to modern web design.',
			feature_image: { url: 'https://picsum.photos/400/300?random=6' },
			author: { name: 'Elena Pérez', slug: 'elena' },
			tags: [{ name: 'Design', slug: 'design' }],
			reading_time: 7,
			published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
		},
		{
			title: 'The Future of SvelteKit',
			slug: 'future-of-sveltekit',
			excerpt: 'Exploring upcoming features and improvements in the SvelteKit framework.',
			feature_image: { url: 'https://picsum.photos/400/300?random=7' },
			author: { name: 'José García', slug: 'jose' },
			tags: [{ name: 'Development', slug: 'development' }],
			reading_time: 10,
			published_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
		}
	];
</script>

<svelte:head>
	<title>{post.title} - {settings.site_title}</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<!-- Hero Visual Editorial -->
<article>
	<Container size="narrow" spacing="normal">
		<!-- Header minimalista -->
		<header class="linear-article__header">
			<div class="linear-article__meta-line"></div>

			<Heading level={1} class="linear-article__title">
				{post.title}
			</Heading>

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
	</Container>
</article>

<!-- Related posts section -->
{#if relatedPosts && relatedPosts.length > 0}
	<section class="related-posts">
		<Container size="base" spacing="loose">
			<Heading level={2}>Artículos Relacionados</Heading>
			<div class="related-posts-grid">
				{#each relatedPosts as relatedPost}
					<Card
						title={relatedPost.title}
						url={`/post/${relatedPost.slug}`}
						excerpt={relatedPost.excerpt}
						featureImage={relatedPost.feature_image?.url || ''}
						authorName={relatedPost.author?.name || ''}
						authorUrl={relatedPost.author ? `/author/${relatedPost.author.slug}` : ''}
						tagName={relatedPost.tags && relatedPost.tags.length > 0
							? relatedPost.tags[0].name
							: ''}
						tagUrl={relatedPost.tags && relatedPost.tags.length > 0
							? `/tag/${relatedPost.tags[0].slug}`
							: ''}
						readingTime={`${relatedPost.reading_time || 0} min`}
						publishedAt={relatedPost.published_at}
						density="compact"
						elevation={1}
						headingLevel={4}
					/>
				{/each}
			</div>
		</Container>
	</section>
{/if}

<style>
	.linear-article__header {
		margin-bottom: var(--space-16);
	}

	.linear-article__meta-line {
		height: var(--line-thin);
		background: var(--border-light);
		margin-bottom: var(--space-8);
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

	.related-posts {
		margin-top: var(--space-20);
		padding-top: var(--space-12);
		border-top: var(--line-thin) solid var(--border-light);
	}

	.related-posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-8);
	}

	@media (max-width: 768px) {
		.related-posts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
