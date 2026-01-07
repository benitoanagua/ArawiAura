<script lang="ts">
	import type { TabPanelProps } from '$lib/types/tabs.js';
	
	export let index: number;
	export let activeIndex: number;
	
	let isActive = false;
	
	$: isActive = index === activeIndex;
</script>

<div 
	id="tab-panel-{index}"
	class="tab-panel" 
	role="tabpanel"
	aria-hidden={!isActive}
	style:display={isActive ? 'block' : 'none'}
>
	{#if isActive}
		<slot />
	{/if}
</div>

<style>
	.tab-panel {
		padding: var(--space-4) 0;
	}
</style>