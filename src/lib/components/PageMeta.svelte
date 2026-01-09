<script lang="ts">
	import type { PageMetaProps } from '$lib/types/page-meta.js';

	let {
		copyright = `© ${new Date().getFullYear()}`,
		links = [],
		showLogo = false,
		class: className
	}: PageMetaProps = $props();
</script>

<footer class="ax-page-meta {className || ''}">
	<div class="ax-page-meta__container">
		<div class="ax-page-meta__start">
			{#if showLogo}
				<div class="ax-page-meta__logo-mark">●</div>
			{/if}
			<span class="ax-page-meta__copyright">{copyright}</span>
		</div>

		{#if links.length > 0}
			<nav class="ax-page-meta__nav">
				{#each links as link}
					<a href={link.href} class="ax-page-meta__link">{link.label}</a>
				{/each}
			</nav>
		{/if}
	</div>
</footer>

<style>
	.ax-page-meta {
		padding: var(--space-8) 0;
		background: var(--color-surface);
		border-top: var(--line-thin) solid var(--color-outline-variant);
		color: var(--color-on-surface-variant);
	}

	.ax-page-meta__container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: 0 var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		align-items: center;
		justify-content: space-between;
	}

	@media (min-width: 640px) {
		.ax-page-meta__container {
			flex-direction: row;
		}
	}

	.ax-page-meta__start {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.ax-page-meta__logo-mark {
		font-size: 0.8em;
		color: var(--color-primary);
	}

	.ax-page-meta__copyright {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		opacity: 0.7;
	}

	.ax-page-meta__nav {
		display: flex;
		gap: var(--space-6);
	}

	.ax-page-meta__link {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		text-decoration: none;
		transition: color var(--duration-fast) ease-out;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ax-page-meta__link:hover {
		color: var(--color-primary);
	}
</style>
