<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ tag, posts, settings } = data);
</script>

<svelte:head>
	<title>{tag.name} - {settings.site_title}</title>
	<meta name="description" content={tag.description || `Posts sobre ${tag.name}`} />
</svelte:head>

<div class="container">
	<!-- Navegación -->
	<nav class="breadcrumb">
		<a href="/">← Volver al inicio</a>
	</nav>

	<!-- Header del tag -->
	<header class="tag-header">
		<div class="tag-info">
			<span class="tag-badge" style="--tag-color: {tag.color || '#3b82f6'}">
				{tag.name}
			</span>
			<h1 class="tag-title">Posts sobre {tag.name}</h1>
			{#if tag.description}
				<p class="tag-description">{tag.description}</p>
			{/if}
			<p class="posts-count">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
		</div>
	</header>

	<!-- Posts -->
	<main class="posts">
		{#if posts.length > 0}
			{#each posts as post}
				<article class="post-card">
					{#if post.feature_image}
						<div class="post-image">
							<img src={post.feature_image.url} alt={post.feature_image.alt || post.title} />
						</div>
					{/if}
					
					<div class="post-content">
						<header class="post-header">
							<h2 class="post-title">
								<a href="/post/{post.slug}">{post.title}</a>
							</h2>
							
							<div class="post-meta">
								<time datetime={post.published_at}>
									{new Date(post.published_at || '').toLocaleDateString('es-ES', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
								<span>•</span>
								<span>{post.reading_time} min de lectura</span>
								<span>•</span>
								<span>Por {post.author.name}</span>
							</div>
						</header>
						
						{#if post.excerpt}
							<p class="post-excerpt">{post.excerpt}</p>
						{/if}
						
						{#if post.tags.length > 1}
							<div class="post-tags">
								{#each post.tags as postTag}
									{#if postTag.slug !== tag.slug}
										<a href="/tag/{postTag.slug}" class="post-tag">
											{postTag.name}
										</a>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		{:else}
			<div class="no-posts">
				<h2>No hay posts con este tag</h2>
				<p>Aún no se han publicado posts sobre {tag.name}.</p>
				<a href="/" class="back-link">Ver todos los posts</a>
			</div>
		{/if}
	</main>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.breadcrumb {
		margin-bottom: 2rem;
	}

	.breadcrumb a {
		color: #3b82f6;
		text-decoration: none;
		font-size: 0.875rem;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.tag-header {
		text-align: center;
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e5e5e5;
	}

	.tag-badge {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: var(--tag-color, #3b82f6);
		color: white;
		border-radius: 1.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.tag-title {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
		color: #1a1a1a;
	}

	.tag-description {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 0.5rem;
	}

	.posts-count {
		font-size: 0.875rem;
		color: #888;
		margin: 0;
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.post-card {
		border: 1px solid #e5e5e5;
		border-radius: 0.5rem;
		overflow: hidden;
		transition: box-shadow 0.2s;
	}

	.post-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.post-image img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.post-content {
		padding: 1.5rem;
	}

	.post-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.5rem;
		line-height: 1.3;
	}

	.post-title a {
		color: #1a1a1a;
		text-decoration: none;
	}

	.post-title a:hover {
		color: #3b82f6;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #666;
		margin-bottom: 1rem;
	}

	.post-excerpt {
		color: #555;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.post-tag {
		padding: 0.25rem 0.5rem;
		background: #f3f4f6;
		color: #374151;
		text-decoration: none;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		transition: background-color 0.2s;
	}

	.post-tag:hover {
		background: #e5e7eb;
	}

	.no-posts {
		text-align: center;
		padding: 3rem 1rem;
		color: #666;
	}

	.no-posts h2 {
		color: #333;
		margin-bottom: 1rem;
	}

	.back-link {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background: #3b82f6;
		color: white;
		text-decoration: none;
		border-radius: 0.25rem;
		transition: background-color 0.2s;
	}

	.back-link:hover {
		background: #2563eb;
	}

	@media (max-width: 640px) {
		.container {
			padding: 1rem;
		}

		.tag-title {
			font-size: 1.75rem;
		}

		.post-content {
			padding: 1rem;
		}

		.post-title {
			font-size: 1.25rem;
		}
	}
</style>