<script lang="ts">
	import type { PageData } from './$types';
	import Pressable from '$lib/components/Pressable.svelte';
	import Card from '$lib/components/Card.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Container from '$lib/components/Container.svelte';

	export let data: PageData;

	$: ({ posts, settings, tags } = data);
</script>

<svelte:head>
	<title>{settings.site_title}</title>
	<meta name="description" content={settings.site_description} />
</svelte:head>

<!-- Hero Section -->
<Hero 
	title={settings.site_title}
	subtitle={settings.site_description}
>
	<Pressable href="/admin" variant="primary">
		Admin Panel
	</Pressable>
	<Pressable href="#posts" variant="outline">
		Ver Posts
	</Pressable>
</Hero>

<!-- Featured Posts Section -->
<section id="posts">
	<Container size="base" spacing="loose">
		<div class="section-header">
			<Heading level={2} class="section-title">Últimos Artículos</Heading>
			{#if posts.length > 0}
				<p class="section-subtitle">
					Explora los últimos artículos publicados en el blog
				</p>
			{/if}
		</div>

		{#if posts.length > 0}
			<div class="cards-grid">
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
					<Heading level={3} class="empty-state__title">Sin artículos aún</Heading>
					<p class="empty-state__description">
						Pronto se publicarán nuevos artículos. ¡Vuelve pronto!
					</p>
					<Pressable href="/admin" variant="ghost">
						Ir al panel de administración
					</Pressable>
				</div>
			</div>
		{/if}
	</Container>
</section>

<!-- Tags Section -->
{#if tags.length > 0}
	<section>
		<Container size="base" spacing="normal">
			<div class="section-header">
				<Heading level={2} class="section-title">Categorías</Heading>
				<p class="section-subtitle">
					Explora artículos por temas y categorías
				</p>
			</div>
			
			<div class="tags-grid">
				{#each tags as tag (tag.id)}
					<Pressable 
						href={`/tag/${tag.slug}`} 
						variant="outline" 
						class="tag-item"
					>
						{tag.name}
					</Pressable>
				{/each}
			</div>
		</Container>
	</section>
{/if}

<style>
	:global(.posts-section),
	:global(.tags-section) {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: var(--space-16) var(--space-8);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}



	.section-subtitle {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--text-secondary);
		max-width: 600px;
		margin: 0 auto;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-8);
	}

	.tags-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-4);
		margin-top: var(--space-8);
	}



	/* Empty State */
	:global(.empty-state) {
		padding: var(--space-20) var(--space-8);
		text-align: center;
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

	@media (max-width: 768px) {
		.cards-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		
	}
</style>
