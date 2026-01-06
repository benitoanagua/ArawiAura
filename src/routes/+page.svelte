<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ posts, tags, pagination, settings } = data);
</script>

<svelte:head>
	<title>{settings.site_title}</title>
	<meta name="description" content={settings.site_description} />
</svelte:head>

<div class="container">
	<!-- Header -->
	<header class="header">
		<h1 class="site-title">{settings.site_title}</h1>
		<p class="site-description">{settings.site_description}</p>
	</header>

	<!-- Tags -->
	{#if tags.length > 0}
		<section class="tags-section">
			<h2>Temas</h2>
			<div class="tags">
				{#each tags as tag}
					<a href="/tag/{tag.slug}" class="tag" style="--tag-color: {tag.color || '#3b82f6'}">
						{tag.name}
					</a>
				{/each}
			</div>
		</section>
	{/if}

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
								<span>Por {post.author?.name || 'Autor desconocido'}</span>
							</div>
						</header>
						
						{#if post.excerpt}
							<p class="post-excerpt">{post.excerpt}</p>
						{/if}
						
						{#if post.tags && post.tags.length > 0}
							<div class="post-tags">
								{#each post.tags as tag}
									{#if tag && tag.slug && tag.name}
										<a href="/tag/{tag.slug}" class="post-tag">
											{tag.name}
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
				<h2>No hay posts publicados aún</h2>
				<p>¡Pronto habrá contenido interesante aquí!</p>
			</div>
		{/if}
	</main>

	<!-- Paginación -->
	{#if pagination.has_prev || pagination.has_next}
		<nav class="pagination">
			{#if pagination.has_prev}
				<a href="?page={pagination.current_page - 1}" class="pagination-link">
					← Anterior
				</a>
			{/if}
			
			<span class="pagination-current">
				Página {pagination.current_page}
			</span>
			
			{#if pagination.has_next}
				<a href="?page={pagination.current_page + 1}" class="pagination-link">
					Siguiente →
				</a>
			{/if}
		</nav>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.site-title {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
		color: #1a1a1a;
	}

	.site-description {
		font-size: 1.1rem;
		color: #666;
		margin: 0;
	}

	.tags-section {
		margin-bottom: 3rem;
	}

	.tags-section h2 {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: var(--tag-color, #3b82f6);
		color: white;
		text-decoration: none;
		border-radius: 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		transition: opacity 0.2s;
	}

	.tag:hover {
		opacity: 0.8;
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

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 3rem;
	}

	.pagination-link {
		padding: 0.5rem 1rem;
		background: #3b82f6;
		color: white;
		text-decoration: none;
		border-radius: 0.25rem;
		transition: background-color 0.2s;
	}

	.pagination-link:hover {
		background: #2563eb;
	}

	.pagination-current {
		color: #666;
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.container {
			padding: 1rem;
		}

		.site-title {
			font-size: 2rem;
		}

		.post-content {
			padding: 1rem;
		}

		.post-title {
			font-size: 1.25rem;
		}
	}
</style>