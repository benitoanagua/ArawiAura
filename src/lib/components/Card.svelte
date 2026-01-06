<script lang="ts">
	export let title: string = '';
	export let caption: string = '';
	export let image: string | null = null;
	export let imageAlt: string = '';
	export let category: string = '';
	export let date: string = '';
	export let author: string = '';
	export let readingTime: number = 0;
	export let tags: Array<{ name: string; slug: string; color?: string; post_count?: number }> = [];
	export let href: string = '#';
	export let variant: 'gallery' | 'post' | 'tag' = 'gallery';

	// Variantes específicas
	$: isGallery = variant === 'gallery';
	$: isPost = variant === 'post';
	$: isTag = variant === 'tag';

	// Formatear fecha para display
	$: formattedDate = date
		? new Date(date).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
		: '';
</script>

<a {href} class="editorial-card" data-variant={variant}>
	{#if image}
		<div class="editorial-card__image">
			<img src={image} alt={imageAlt} loading="lazy" />
		</div>
	{/if}

	<div class="editorial-card__content">
		<!-- Capa Terciaria: Metadata Estructural -->
		{#if category && isGallery}
			<div class="editorial-card__hierarchy-tertiary">
				<span class="editorial-card__category">{category}</span>
			</div>
		{/if}

		<!-- Capa Primaria: Título -->
		<h3 class="editorial-card__title">
			{title}
		</h3>

		<!-- Capa Secundaria: Caption/Descripción -->
		{#if caption && (isGallery || isTag)}
			<p class="editorial-card__caption">{caption}</p>
		{/if}

		<!-- Metadata según variante -->
		{#if isPost}
			<div class="editorial-card__hierarchy-tertiary">
				{#if date}
					<time datetime={date} class="editorial-card__meta-item">{formattedDate}</time>
				{/if}
				{#if readingTime}
					<span class="editorial-card__meta-item">{readingTime} min</span>
				{/if}
				{#if author}
					<span class="editorial-card__meta-item">Por {author}</span>
				{/if}
			</div>

			{#if tags && tags.length > 0}
				<div class="editorial-card__tags">
					{#each tags as tag}
						<span
							class="editorial-card__tag-label"
							style="--tag-color: {tag.color || 'var(--text-muted)'}"
						>
							{tag.name}
						</span>
					{/each}
				</div>
			{/if}
		{/if}

		{#if isTag && date}
			<div class="editorial-card__hierarchy-tertiary">
				<time datetime={date} class="editorial-card__meta-item">{formattedDate}</time>
			</div>
		{/if}
	</div>
</a>

<style>
	/* Editorial Card Base */
	:global(.editorial-card) {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--bg-white);
		border: 1px solid var(--border-light);
		border-radius: var(--border-radius-base);
		text-decoration: none;
		color: inherit;
		transition: all var(--duration-fast) var(--ease-out);
		overflow: hidden;
	}

	:global(.editorial-card:hover) {
		transform: translateY(-4px);
		box-shadow: var(--shadow-base);
		border-color: var(--accent-primary);
	}

	:global(.editorial-card:focus-visible) {
		outline: 2px solid var(--accent-primary);
		outline-offset: 2px;
	}

	/* Image Container */
	:global(.editorial-card__image) {
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: var(--bg-cool);
	}

	:global(.editorial-card__image img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-slow) var(--ease-out);
	}

	:global(.editorial-card:hover .editorial-card__image img) {
		transform: scale(1.08);
	}

	/* Content Container */
	:global(.editorial-card__content) {
		padding: var(--space-5);
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* Hierarchical Layers */
	:global(.editorial-card__hierarchy-tertiary) {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		margin-bottom: var(--space-3);
	}

	:global(.editorial-card__category) {
		color: var(--accent-primary);
		font-weight: 600;
	}

	:global(.editorial-card__meta-item) {
		color: var(--text-secondary);
	}

	/* Title (Layer Primary) */
	:global(.editorial-card__title) {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		font-weight: 600;
		line-height: var(--leading-snug);
		color: var(--text-primary);
		margin: 0 0 var(--space-2) 0;
		flex-grow: 0;
	}

	:global(.editorial-card:hover .editorial-card__title) {
		color: var(--accent-primary);
	}

	/* Caption (Layer Secondary) */
	:global(.editorial-card__caption) {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		color: var(--text-secondary);
		margin: 0 0 var(--space-3) 0;
		flex-grow: 1;
	}

	/* Tags */
	:global(.editorial-card__tags) {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: auto;
	}

	:global(.editorial-card__tag-label) {
		display: inline-block;
		padding: var(--space-1) var(--space-2);
		background: rgba(var(--tag-color), 0.1);
		color: var(--tag-color);
		border: 1px solid rgba(var(--tag-color), 0.2);
		border-radius: var(--border-radius-sm);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	/* Responsive */
	@media (max-width: 768px) {
		:global(.editorial-card__content) {
			padding: var(--space-4);
		}

		:global(.editorial-card__title) {
			font-size: var(--text-base);
		}

		:global(.editorial-card__caption) {
			font-size: var(--text-xs);
		}
	}
</style>
