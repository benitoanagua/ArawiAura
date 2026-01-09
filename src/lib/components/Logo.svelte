<script lang="ts">
	import type { LogoTextSize, LogoProps } from '$lib/types/logo.js';

	export let src: string = '';
	export let alt: string = 'Logo';
	export let href: string = '/';
	export let width: number = 150;
	export let height: number = 50;
	export let showText: boolean = true;
	export let text: string = 'Logo';
	export let textSize: LogoTextSize = 'md';

	let textClass = `logo-text--${textSize}`;
</script>

{#if href}
	<a {href} class="logo-link" aria-label={alt}>
		{#if src}
			<img {src} {alt} class="logo-image" style={`width: ${width}px; height: ${height}px;`} />
		{/if}

		{#if showText && text}
			<span class={`logo-text ${textClass}`}>{text}</span>
		{/if}
	</a>
{:else}
	<div class="logo">
		{#if src}
			<img {src} {alt} class="logo-image" style={`width: ${width}px; height: ${height}px;`} />
		{/if}

		{#if showText && text}
			<span class={`logo-text ${textClass}`}>{text}</span>
		{/if}
	</div>
{/if}

<style>
	.logo-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		text-decoration: none;
		padding: var(--space-1);
		border: var(--line-thin) solid transparent;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
	}

	.logo-link:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}

	.logo-link:active {
		transform: scale(0.98);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.logo-image {
		max-width: 100%;
		height: auto;
		object-fit: contain;
		filter: drop-shadow(0 0 1px var(--color-outline));
	}

	.logo-text {
		font-family: var(--font-serif);
		font-weight: 700;
		color: var(--color-primary);
		margin: 0;
		letter-spacing: -0.02em;
	}

	.logo-text--sm {
		font-size: var(--text-lg);
	}
	.logo-text--md {
		font-size: var(--text-2xl);
	}
	.logo-text--lg {
		font-size: var(--text-4xl);
	}
</style>
