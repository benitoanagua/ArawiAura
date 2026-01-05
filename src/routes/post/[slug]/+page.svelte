<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ post, settings } = data);
</script>

<svelte:head>
	<title>{post.title} - {settings.site_title}</title>
	<meta name="description" content={post.excerpt || `Post de ${post.author.name}`} />
	
	<!-- Open Graph -->
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt || `Post de ${post.author.name}`} />
	<meta property="og:type" content="article" />
	{#if post.feature_image}
		<meta property="og:image" content={post.feature_image.url} />
	{/if}
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.excerpt || `Post de ${post.author.name}`} />
	{#if post.feature_image}
		<meta name="twitter:image" content={post.feature_image.url} />
	{/if}
</svelte:head>

<div class="container">
	<!-- Navegación -->
	<nav class="breadcrumb">
		<a href="/">← Volver al inicio</a>
	</nav>

	<!-- Artículo -->
	<article class="post">
		<!-- Header del post -->
		<header class="post-header">
			{#if post.feature_image}
				<div class="feature-image">
					<img src={post.feature_image.url} alt={post.feature_image.alt || post.title} />
				</div>
			{/if}
			
			<div class="post-meta">
				<h1 class="post-title">{post.title}</h1>
				
				<div class="post-info">
					<div class="author-info">
						{#if post.author.profile_image}
							<img src={post.author.profile_image.url} alt={post.author.name} class="author-avatar" />
						{/if}
						<div>
							<div class="author-name">{post.author.name}</div>
							<div class="post-date">
								<time datetime={post.published_at}>
									{new Date(post.published_at || '').toLocaleDateString('es-ES', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
								<span>•</span>
								<span>{post.reading_time} min de lectura</span>
							</div>
						</div>
					</div>
				</div>
				
				{#if post.tags.length > 0}
					<div class="post-tags">
						{#each post.tags as tag}
							<a href="/tag/{tag.slug}" class="tag" style="--tag-color: {tag.color || '#3b82f6'}">
								{tag.name}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</header>

		<!-- Contenido del post -->
		<div class="post-content">
			{@html post.html}
		</div>
	</article>

	<!-- Autor -->
	{#if post.author.bio}
		<section class="author-section">
			<div class="author-card">
				{#if post.author.profile_image}
					<img src={post.author.profile_image.url} alt={post.author.name} class="author-image" />
				{/if}
				<div class="author-details">
					<h3>Sobre {post.author.name}</h3>
					<p>{post.author.bio}</p>
				</div>
			</div>
		</section>
	{/if}

	<!-- Navegación de posts relacionados -->
	<nav class="post-navigation">
		<a href="/" class="nav-link">
			← Ver todos los posts
		</a>
	</nav>
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

	.post {
		margin-bottom: 3rem;
	}

	.post-header {
		margin-bottom: 2rem;
	}

	.feature-image {
		margin-bottom: 2rem;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.feature-image img {
		width: 100%;
		height: 300px;
		object-fit: cover;
	}

	.post-title {
		font-size: 2.5rem;
		font-weight: bold;
		line-height: 1.2;
		margin-bottom: 1rem;
		color: #1a1a1a;
	}

	.post-info {
		margin-bottom: 1.5rem;
	}

	.author-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.author-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
	}

	.author-name {
		font-weight: 600;
		color: #1a1a1a;
	}

	.post-date {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #666;
	}

	.post-tags {
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

	.post-content {
		line-height: 1.7;
		color: #333;
		font-size: 1.1rem;
	}

	.post-content :global(h1),
	.post-content :global(h2),
	.post-content :global(h3),
	.post-content :global(h4),
	.post-content :global(h5),
	.post-content :global(h6) {
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: #1a1a1a;
		font-weight: 600;
	}

	.post-content :global(h1) { font-size: 2rem; }
	.post-content :global(h2) { font-size: 1.75rem; }
	.post-content :global(h3) { font-size: 1.5rem; }

	.post-content :global(p) {
		margin-bottom: 1.5rem;
	}

	.post-content :global(ul),
	.post-content :global(ol) {
		margin-bottom: 1.5rem;
		padding-left: 1.5rem;
	}

	.post-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.post-content :global(blockquote) {
		border-left: 4px solid #3b82f6;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #555;
	}

	.post-content :global(code) {
		background: #f3f4f6;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-family: 'Courier New', monospace;
		font-size: 0.875em;
	}

	.post-content :global(pre) {
		background: #1a1a1a;
		color: #f3f4f6;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.post-content :global(pre code) {
		background: none;
		padding: 0;
		color: inherit;
	}

	.author-section {
		margin: 3rem 0;
		padding: 2rem;
		background: #f9fafb;
		border-radius: 0.5rem;
	}

	.author-card {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.author-image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.author-details h3 {
		margin: 0 0 0.5rem 0;
		color: #1a1a1a;
	}

	.author-details p {
		margin: 0;
		color: #555;
		line-height: 1.6;
	}

	.post-navigation {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid #e5e5e5;
	}

	.nav-link {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: #3b82f6;
		color: white;
		text-decoration: none;
		border-radius: 0.5rem;
		transition: background-color 0.2s;
	}

	.nav-link:hover {
		background: #2563eb;
	}

	@media (max-width: 640px) {
		.container {
			padding: 1rem;
		}

		.post-title {
			font-size: 2rem;
		}

		.feature-image img {
			height: 200px;
		}

		.author-card {
			flex-direction: column;
			text-align: center;
		}

		.author-image {
			align-self: center;
		}

		.post-content {
			font-size: 1rem;
		}
	}
</style>