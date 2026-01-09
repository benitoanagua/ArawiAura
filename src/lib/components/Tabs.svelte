<script lang="ts">
	import Tab from './Tab.svelte';
	import type { TabVariant, TabsProps } from '$lib/types/tabs.js';

	export let activeTab: number = 0;
	export let variant: TabVariant = 'line';

	let tabs: any[] = [];

	function registerTab(tab: any) {
		tabs = [...tabs, tab];
		return tabs.length - 1;
	}

	function activateTab(index: number) {
		activeTab = index;
	}

	$: activeIndex = Math.min(Math.max(0, activeTab), tabs.length - 1);
</script>

<div class="tabs tabs--{variant}">
	<div class="tabs-list" role="tablist">
		<slot name="tabs" {registerTab} {activateTab} {activeIndex} />
	</div>
	<div class="tabs-panels">
		<slot name="panels" {activeIndex} />
	</div>
</div>

<style>
	.tabs {
		display: flex;
		flex-direction: column;
		background-color: var(--color-surface);
	}

	.tabs-list {
		display: flex;
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
	}

	.tabs--boxed .tabs-list {
		border: var(--line-thin) solid var(--color-outline-variant);
		border-radius: var(--space-1);
		padding: var(--space-1);
		gap: var(--space-1);
		background-color: var(--color-surface-container-low);
	}

	.tabs-panels {
		padding-top: var(--space-4);
	}
</style>
