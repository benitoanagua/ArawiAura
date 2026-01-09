<script lang="ts">
	import type { PageData } from './$types';
	import Pressable from '$lib/components/Pressable.svelte';
	import Card from '$lib/components/Card.svelte';

	export let data: PageData;

	$: ({ posts, settings } = data);
</script>

<svelte:head>
	<title>{settings.site_title}</title>
	<meta name="description" content={settings.site_description} />
</svelte:head>

<!-- Posts with enhanced Card components -->
<section class="posts-section">
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
		<p class="empty-state">No hay posts aún.</p>
	{/if}
</section>

<style>
	.posts-section {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: var(--space-16) var(--space-8);
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-8);
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

		.cards-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
