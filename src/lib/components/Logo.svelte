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
	<a href={href} class="logo-link" aria-label={alt}>
		{#if src}
			<img 
				src={src} 
				alt={alt} 
				class="logo-image"
				style={`width: ${width}px; height: ${height}px;`}
			/>
		{/if}
		
		{#if showText && text}
			<span class={`logo-text ${textClass}`}>{text}</span>
		{/if}
	</a>
{:else}
	<div class="logo">
		{#if src}
			<img 
				src={src} 
				alt={alt} 
				class="logo-image"
				style={`width: ${width}px; height: ${height}px;`}
			/>
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
		gap: var(--space-2);
		text-decoration: none;
	}
	
	.logo {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}
	
	.logo-image {
		max-width: 100%;
		height: auto;
		object-fit: contain;
	}
	
	.logo-text {
		font-family: var(--font-serif);
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}
	
	.logo-text--sm { font-size: var(--text-base); }
	.logo-text--md { font-size: var(--text-lg); }
	.logo-text--lg { font-size: var(--text-xl); }
</style>