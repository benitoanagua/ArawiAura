<script lang="ts">
	import { getContext } from 'svelte';
	import type { TabProps, TabsContext } from '$lib/types/tabs.js';

	let { index, label, children, class: className }: TabProps = $props();

	const tabs = getContext<TabsContext>('tabs');

	const isActive = $derived(index === tabs?.state.activeIndex);

	function handleClick() {
		tabs?.setActiveIndex(index);
	}
</script>

<button
	class="ax-tab {className || ''}"
	class:ax-tab--is-active={isActive}
	role="tab"
	aria-selected={isActive}
	aria-controls="tab-panel-{index}"
	id="tab-{index}"
	onclick={handleClick}
>
	{#if label}
		{label}
	{:else}
		{@render children?.()}
	{/if}
</button>

<style>
	.ax-tab {
		background: none;
		border: none;
		padding: var(--space-3) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		cursor: pointer;
		position: relative;
		outline: none;
		/* Zero Displacement: Bottom border as inset box-shadow */
		box-shadow: inset 0 -1px 0 0 transparent;
		transition:
			color var(--duration-fast) var(--ease-out),
			background-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);
	}

	.ax-tab:hover {
		color: var(--color-on-surface);
		background-color: var(--color-surface-container-lowest);
	}

	.ax-tab:focus-visible {
		box-shadow:
			inset 0 0 0 2px var(--color-primary),
			0 0 0 4px var(--color-surface);
		z-index: 2;
	}

	.ax-tab--is-active {
		color: var(--color-primary);
		font-weight: 700;
		/* Zero Displacement: Thick indicator without moving the element */
		box-shadow: inset 0 -2px 0 0 var(--color-primary);
	}

	/* Boxed Variant Support */
	:global(.ax-tabs--boxed) .ax-tab {
		border-radius: var(--space-1);
		box-shadow: none;
	}

	:global(.ax-tabs--boxed) .ax-tab--is-active {
		background: var(--color-surface);
		color: var(--color-primary);
		box-shadow: var(--shadow-1);
	}
</style>
