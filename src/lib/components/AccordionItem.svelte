<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		title = '',
		index,
		isOpen = () => false,
		toggle = () => {},
		children
	} = $props<{
		title?: string;
		index: number;
		isOpen?: (index: number) => boolean;
		toggle?: (index: number) => void;
		children?: import('svelte').Snippet;
	}>();

	// Use $derived instead of $: reactive statement
	let isExpanded = $derived(isOpen(index));
</script>

<div class="accordion-item" class:is-expanded={isExpanded}>
	<button
		class="accordion-header"
		onclick={() => toggle(index)}
		aria-expanded={isExpanded}
		aria-controls="accordion-content-{index}"
	>
		<span class="accordion-title">{title}</span>
		<div class="accordion-icon" class:rotate={isExpanded}>
			<Icon icon="carbon:chevron-down" width="1.2em" height="1.2em" />
		</div>
	</button>

	<div
		id="accordion-content-{index}"
		class="accordion-content"
		aria-hidden={!isExpanded}
		style:display={isExpanded ? 'block' : 'none'}
	>
		<div class="accordion-body">
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.accordion-item {
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
		background-color: var(--color-surface);
		transition: background-color var(--duration-base) var(--duration-base);
	}

	.accordion-item:last-child {
		border-bottom: none;
	}

	.accordion-header {
		width: 100%;
		padding: var(--space-4);
		text-align: left;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: var(--font-sans);
		font-size: var(--text-base);
		font-weight: 500;
		color: var(--color-on-surface);
		transition: all var(--duration-fast) ease-out;
		position: relative;
		outline: none;
	}

	/* Architectural Outline: Focus Ring */
	.accordion-header:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
		z-index: 10;
	}

	/* Industrial Switch Feel: 2px border on hover/active */
	.accordion-header:hover {
		background-color: var(--color-surface-container-low);
	}

	.is-expanded .accordion-header {
		border-bottom: var(--line-base) solid var(--color-primary);
		color: var(--color-primary);
	}

	.accordion-title {
		margin: 0;
	}

	.accordion-icon {
		display: flex;
		align-items: center;
		transition: transform var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);
	}

	.accordion-icon.rotate {
		transform: rotate(180deg);
		color: var(--color-primary);
	}

	.accordion-content {
		overflow: hidden;
	}

	.accordion-body {
		padding: var(--space-4);
		font-family: var(--font-sans);
		color: var(--color-on-surface-variant);
		line-height: var(--leading-relaxed);
		border-top: var(--line-thin) solid var(--color-outline-variant);
	}

	/* Metadata Technical Look */
	:global(.accordion-body p) {
		margin-bottom: var(--space-4);
	}
</style>
