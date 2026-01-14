<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HeadingProps } from '$lib/types/Heading.js';

	let { level = 4, class: className = '', children }: HeadingProps = $props();
</script>

{#if level === 1}
	<h1 class="ax-heading ax-heading--1 {className}">{@render children()}</h1>
{:else if level === 2}
	<h2 class="ax-heading ax-heading--2 {className}">{@render children()}</h2>
{:else if level === 3}
	<h3 class="ax-heading ax-heading--3 {className}">{@render children()}</h3>
{:else if level === 4}
	<h4 class="ax-heading ax-heading--4 {className}">{@render children()}</h4>
{:else if level === 5}
	<h5 class="ax-heading ax-heading--5 {className}">{@render children()}</h5>
{:else}
	<h6 class="ax-heading ax-heading--6 {className}">{@render children()}</h6>
{/if}

<style>
	.ax-heading {
		margin: 0;
		font-family: var(--font-sans);
		line-height: var(--leading-tight);
	}

	.ax-heading--1 {
		font-size: var(--text-4xl);
		font-weight: 800;
	}

	.ax-heading--2 {
		font-size: var(--text-3xl);
		font-weight: 700;
	}

	.ax-heading--3 {
		font-size: var(--text-2xl);
		font-weight: 600;
	}

	.ax-heading--4 {
		font-size: var(--text-xl);
		font-weight: 600;
	}

	.ax-heading--5 {
		font-size: var(--text-lg);
		font-weight: 600;
	}

	.ax-heading--6 {
		font-size: var(--text-base);
		font-weight: 600;
	}
</style>