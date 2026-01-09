<script lang="ts">
	import { getContext } from 'svelte';
	import type { TabPanelProps, TabsContext } from '$lib/types/tabs.js';

	let { index, children, class: className }: TabPanelProps = $props();

	const tabs = getContext<TabsContext>('tabs');
	const isActive = $derived(index === tabs?.state.activeIndex);
</script>

<div
	id="tab-panel-{index}"
	class="ax-tab-panel {className || ''}"
	role="tabpanel"
	aria-labelledby="tab-{index}"
	aria-hidden={!isActive}
	style:display={isActive ? 'block' : 'none'}
>
	{#if isActive}
		{@render children?.()}
	{/if}
</div>

<style>
	.ax-tab-panel {
		padding: var(--space-4) 0;
		animation: ax-fade-in var(--duration-base) var(--ease-out);
	}

	@keyframes ax-fade-in {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
