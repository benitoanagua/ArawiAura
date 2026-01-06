<script lang="ts">
	export let title: string = '';
	export let subtitle: string = '';
	export let image: string | null = null;
	export let imageAlt: string = '';
	export let overlay: boolean = true;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
	export let variant: 'default' | 'center' | 'left' = 'default';

	// Size classes
	$: sizeClasses = {
		sm: 'hero--sm',
		md: 'hero--md',
		lg: 'hero--lg',
		xl: 'hero--xl'
	}[size];

	// Variant classes
	$: variantClasses = {
		default: 'hero--left',
		center: 'hero--center',
		left: 'hero--left'
	}[variant];
</script>

<section class="hero {sizeClasses} {variantClasses}">
	{#if image}
		<div class="hero__image">
			<img src={image} alt={imageAlt} loading="eager" decoding="async" />
			{#if overlay}
				<div class="hero__overlay"></div>
			{/if}
		</div>
	{/if}

	<div class="hero__content">
		<h1 class="hero__title">
			{title}
		</h1>

		{#if subtitle}
			<p class="hero__subtitle">
				{subtitle}
			</p>
		{/if}

		<slot />
	</div>
</section>

<style>
	/* Hero Editorial Base */
	:global(.hero) {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: var(--bg-cool);
	}

	/* Tamaños (altura controlada) */
	:global(.hero--sm) {
		min-height: 300px;
		height: 40vh;
		max-height: 400px;
	}

	:global(.hero--md) {
		min-height: 400px;
		height: 50vh;
		max-height: 500px;
	}

	:global(.hero--lg) {
		min-height: 500px;
		height: 60vh;
		max-height: 700px;
	}

	:global(.hero--xl) {
		min-height: 600px;
		height: 70vh;
		max-height: 800px;
	}

	/* Imagen */
	:global(.hero__image) {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	:global(.hero__image img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Overlay Editorial */
	:global(.hero__overlay) {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%);
		z-index: 2;
	}

	/* Contenido */
	:global(.hero__content) {
		position: relative;
		z-index: 3;
		color: white;
		max-width: 1000px;
		padding: var(--space-12);
		text-align: center;
	}

	:global(.hero--left .hero__content) {
		text-align: left;
		max-width: 600px;
		padding-left: var(--space-20);
	}

	/* Título (Layer Primary) */
	:global(.hero__title) {
		font-family: var(--font-serif);
		font-size: clamp(32px, 7vw, 72px);
		font-weight: 700;
		line-height: var(--leading-tight);
		margin-bottom: var(--space-6);
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	}

	/* Subtítulo (Layer Secondary) */
	:global(.hero__subtitle) {
		font-family: var(--font-sans);
		font-size: clamp(18px, 3vw, 28px);
		font-weight: 400;
		line-height: var(--leading-snug);
		margin-bottom: var(--space-8);
		opacity: 0.95;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
	}

	/* Responsive */
	@media (max-width: 768px) {
		:global(.hero__content) {
			padding: var(--space-8);
		}

		:global(.hero--left .hero__content) {
			padding-left: var(--space-8);
			text-align: center;
		}

		:global(.hero__title) {
			font-size: var(--text-4xl);
		}

		:global(.hero__subtitle) {
			font-size: var(--text-xl);
		}
	}
</style>
