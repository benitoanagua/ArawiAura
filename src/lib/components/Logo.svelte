<script lang="ts">
	import type { LogoProps } from '$lib/types/logo.js';

	let {
		src = '',
		alt = 'Logo',
		href = '/',
		width = 150,
		height = 50,
		showText = true,
		text = 'Logo',
		textSize = 'md',
		class: className
	}: LogoProps = $props();

	const textClass = $derived(`ax-logo__text--${textSize}`);
</script>

{#if href}
	<a {href} class="ax-logo-link {className || ''}" aria-label={alt}>
		{#if src}
			<img {src} {alt} class="ax-logo__image" style:width="{width}px" style:height="{height}px" />
		{/if}

		{#if showText && text}
			<span class="ax-logo__text {textClass}">{text}</span>
		{/if}
	</a>
{:else}
	<div class="ax-logo {className || ''}">
		{#if src}
			<img {src} {alt} class="ax-logo__image" style:width="{width}px" style:height="{height}px" />
		{/if}

		{#if showText && text}
			<span class="ax-logo__text {textClass}">{text}</span>
		{/if}
	</div>
{/if}

<style>
	.ax-logo-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		text-decoration: none;
		padding: var(--space-1);
		border: var(--line-thin) solid transparent;
		border-radius: var(--space-1);
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
		/* Zero Displacement: Focus ring as inset shadow */
		box-shadow: inset 0 0 0 0 var(--color-primary);
	}

	.ax-logo-link:hover {
		background-color: var(--color-surface-container-low);
	}

	.ax-logo-link:focus-visible {
		box-shadow: inset 0 0 0 2px var(--color-primary);
	}

	.ax-logo-link:active {
		transform: scale(0.98);
	}

	.ax-logo {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-1);
	}

	.ax-logo__image {
		max-width: 100%;
		object-fit: contain;
		filter: drop-shadow(0 0 1px var(--color-outline));
	}

	.ax-logo__text {
		font-family: var(--font-serif);
		font-weight: 700;
		color: var(--color-primary);
		margin: 0;
		letter-spacing: -0.02em;
		line-height: normal;
	}

	.ax-logo__text--sm {
		font-size: var(--text-lg);
	}
	.ax-logo__text--md {
		font-size: var(--text-2xl);
	}
	.ax-logo__text--lg {
		font-size: var(--text-4xl);
	}
</style>
