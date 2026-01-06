<script lang="ts">
	export let variant: 'gallery' | 'post' | 'tag' = 'gallery';
	export let title: string = '';
	export let subtitle: string = '';
	export let caption: string = ''; // Alias para subtitle, para compatibilidad
	export let date: string = '';
	export let readingTime: number = 0;
	export let tags: string[] = [];
	export let href: string = '#'; // Para hacer el card clickable

	// Usar caption como fallback para subtitle
	$: displaySubtitle = subtitle || caption;

	// Formateadores
	$: formattedDate = date
		? new Date(date).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
		: '';
</script>

<a {href} class="editorial-card-link">
	<article class="editorial-card" data-variant={variant}>
		<!-- Cabecera con línea estructural -->
		<div class="editorial-card__header">
			<div class="editorial-card__meta-line"></div>
		</div>

		<!-- Contenido -->
		<div class="editorial-card__content">
			<h3 class="editorial-card__title">
				{title}
			</h3>

			{#if displaySubtitle}
				<p class="editorial-card__subtitle">
					{displaySubtitle}
				</p>
			{/if}

			<div class="editorial-card__metadata">
				{#if date}
					<time datetime={date} class="metadata-item">
						{formattedDate}
					</time>
				{/if}

				{#if readingTime}
					<span class="metadata-divider">•</span>
					<span class="metadata-item">
						{readingTime} min
					</span>
				{/if}
			</div>

			{#if tags && tags.length > 0}
				<div class="editorial-card__tags">
					{#each tags as tag}
						<span class="editorial-tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Pie con línea estructural -->
		<div class="editorial-card__footer">
			<div class="editorial-card__footer-line"></div>
		</div>
	</article>
</a>

<style>
	.editorial-card-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.editorial-card {
		background: var(--bg-white);
		border: var(--line-thin) solid var(--border-light);
		transition: all var(--duration-base) var(--ease-out);
		text-decoration: none;
		display: block;
		color: inherit;
		height: 100%;
	}

	.editorial-card:hover {
		border-color: var(--text-primary);
		transform: translateY(-2px);
	}

	.editorial-card__header {
		padding: var(--space-4) var(--space-6);
	}

	.editorial-card__meta-line {
		height: var(--line-thin);
		background: var(--border-light);
	}

	.editorial-card__content {
		padding: 0 var(--space-6) var(--space-6);
	}

	.editorial-card__title {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		font-weight: 600;
		line-height: var(--leading-tight);
		margin-bottom: var(--space-3);
		color: var(--text-primary);
	}

	.editorial-card__subtitle {
		font-family: var(--font-serif);
		font-size: var(--text-sm);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		margin-bottom: var(--space-4);
	}

	.editorial-card__metadata {
		display: flex;
		gap: var(--space-2);
		align-items: center;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--space-4);
	}

	.metadata-divider {
		color: var(--border-medium);
	}

	.editorial-card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.editorial-tag {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		padding: var(--space-1) var(--space-2);
		border: var(--line-thin) solid var(--border-light);
	}

	.editorial-card__footer {
		padding: var(--space-4) var(--space-6);
	}

	.editorial-card__footer-line {
		height: var(--line-thin);
		background: var(--border-light);
	}
</style>
