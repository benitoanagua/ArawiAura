<script lang="ts">
	import { setContext } from 'svelte';
	import type { TabsProps, TabsContext } from '$lib/types/Tabs.js';

	let { activeTab = 0, variant = 'line', children, class: className }: TabsProps = $props();

	// Use a single reactive object for context
	const tabsState = $state({
		activeIndex: (() => activeTab)(),
		variant: (() => variant)()
	});

	// Sync with external prop updates
	$effect(() => {
		tabsState.activeIndex = activeTab;
	});

	$effect(() => {
		tabsState.variant = variant;
	});

	function setActiveIndex(index: number) {
		tabsState.activeIndex = index;
	}

	setContext('tabs', {
		state: tabsState,
		setActiveIndex
	});
</script>

<div class="ax-tabs ax-tabs--{variant} {className || ''}">
	{@render children?.()}
</div>

<style>
	.ax-tabs {
		display: flex;
		flex-direction: column;
		background-color: var(--color-surface);
		width: 100%;
	}

	:global(.ax-tabs__list) {
		display: flex;
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
	}

	:global(.ax-tabs--boxed .ax-tabs__list) {
		border: var(--line-thin) solid var(--color-outline-variant);
		border-radius: var(--space-1);
		padding: var(--space-1);
		gap: var(--space-1);
		background-color: var(--color-surface-container-low);
	}

	:global(.ax-tabs__panels) {
		padding-top: var(--space-4);
	}
</style>
