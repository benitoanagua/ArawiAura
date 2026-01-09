<script lang="ts">
	let { label, index, activeIndex, activateTab } = $props<{
		label: string;
		index: number;
		activeIndex: number;
		activateTab: (index: number) => void;
	}>();

	let isActive = $derived(index === activeIndex);
</script>

<button
	class="tab"
	class:is-active={isActive}
	role="tab"
	aria-selected={isActive}
	aria-controls="tab-panel-{index}"
	onclick={() => activateTab(index)}
>
	{label}
</button>

<style>
	.tab {
		background: none;
		border: none;
		padding: var(--space-3) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-on-surface-variant);
		cursor: pointer;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		outline: none;
		border-bottom: var(--line-thin) solid transparent;
	}

	.tab:hover {
		color: var(--color-primary);
		background-color: var(--color-surface-container-lowest);
	}

	.tab:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
		z-index: 10;
	}

	.tab.is-active {
		color: var(--color-primary);
		border-bottom: var(--line-base) solid var(--color-primary);
	}

	:global(.tabs--boxed) .tab {
		border: var(--line-thin) solid transparent;
		border-radius: var(--space-1);
	}

	:global(.tabs--boxed) .tab.is-active {
		background: var(--color-surface);
		color: var(--color-primary);
		border-color: var(--color-outline-variant);
		font-weight: 700;
	}
</style>
