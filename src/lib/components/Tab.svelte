<script lang="ts">
	import type { TabProps } from '$lib/types/tabs.js';
	
	export let label: string;
	export let index: number;
	export let activeIndex: number;
	export let registerTab: (tab: any) => number;
	export let activateTab: (index: number) => void;
	
	// Register this tab with the parent
	let tabIndex = registerTab({ index, label });
	
	let isActive = false;
	
	$: isActive = index === activeIndex;
</script>

<button
	class="tab {isActive ? 'tab--active' : ''}"
	role="tab"
	aria-selected={isActive}
	aria-controls="tab-panel-{index}"
	on:click={() => activateTab(index)}
>
	{label}
</button>

<style>
	.tab {
		padding: var(--space-3) var(--space-4);
		border: none;
		background: none;
		font-family: var(--font-sans);
		font-size: var(--text-base);
		font-weight: 500;
		color: var(--text-secondary);
		cursor: pointer;
		border-bottom: var(--line-thin) solid transparent;
		transition: all var(--duration-fast) ease-out;
	}
	
	.tab:hover {
		color: var(--text-primary);
	}
	
	.tab--active {
		color: var(--accent-primary);
		border-bottom: var(--line-base) solid var(--accent-primary);
	}
	
	/* Boxed tab styles - currently unused but preserved for future use */
	/* .tabs--boxed .tab {
		border-radius: var(--space-1);
		border: var(--line-thin) solid transparent;
		border-bottom: none;
		margin-bottom: 0;
	}
	
	.tabs--boxed .tab--active {
		border: var(--line-thin) solid var(--border-light);
		border-bottom: none;
		background: var(--bg-white);
		margin-bottom: -1px;
		position: relative;
		z-index: 1;
	} */
</style>