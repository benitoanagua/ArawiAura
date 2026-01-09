<script lang="ts">
	let {
		title = '',
		subtitle = '',
		image = '',
		children
	} = $props<{
		title?: string;
		subtitle?: string;
		image?: string;
		children?: import('svelte').Snippet;
	}>();
</script>

<section class="hero" class:has-image={!!image}>
	<div class="hero-container">
		<div class="hero-content">
			{#if title}
				<h1 class="hero-title">{title}</h1>
			{/if}
			{#if subtitle}
				<p class="hero-subtitle">{subtitle}</p>
			{/if}
			<div class="hero-actions">
				{@render children?.()}
			</div>
		</div>
		{#if image}
			<div class="hero-image-container">
				<img src={image} alt={title} class="hero-image" />
				<div class="hero-image-overlay"></div>
			</div>
		{/if}
	</div>
</section>

<style>
	.hero {
		padding: var(--space-16) 0;
		background-color: var(--color-surface);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
		position: relative;
		overflow: hidden;
	}

	.hero-container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: 0 var(--space-8);
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-12);
		align-items: center;
	}

	@media (min-width: 1024px) {
		.hero-container {
			grid-template-columns: 1fr 1fr;
		}
	}

	.hero-content {
		z-index: 2;
	}

	.hero-title {
		font-family: var(--font-sans);
		font-size: var(--text-5xl);
		font-weight: 800;
		line-height: var(--leading-tight);
		color: var(--color-on-surface);
		margin-bottom: var(--space-6);
		letter-spacing: -0.04em;
	}

	.hero-subtitle {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		line-height: var(--leading-relaxed);
		color: var(--color-on-surface-variant);
		margin-bottom: var(--space-8);
		max-width: 600px;
	}

	.hero-actions {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.hero-image-container {
		position: relative;
		border: var(--line-thick) solid var(--color-primary);
		padding: var(--space-2);
		background-color: var(--color-surface-container-high);
	}

	.hero-image {
		width: 100%;
		height: auto;
		display: block;
		filter: saturate(0.8) contrast(1.1);
	}

	.hero-image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 1px solid rgba(255, 255, 255, 0.2);
		pointer-events: none;
	}

	/* Architectural Grid background */
	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image:
			linear-gradient(var(--color-outline-variant) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-outline-variant) 1px, transparent 1px);
		background-size: 100px 100px;
		opacity: 0.1;
		pointer-events: none;
	}
</style>
