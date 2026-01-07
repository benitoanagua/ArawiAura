<script lang="ts">
	import type { AccordionItemProps } from '$lib/types/accordion.js';
	
	// Use Svelte 5 $props() syntax
	let { 
		title = '', 
		index, 
		isOpen = () => false, 
		toggle = () => {}, 
		children 
	}: AccordionItemProps & { 
		isOpen?: (index: number) => boolean, 
		toggle?: (index: number) => void,
		children?: any 
	} = $props();
	
	// Use $derived instead of $: reactive statement
	let isExpanded = $derived(isOpen(index));
</script>

<div class="accordion-item">
	<button 
		class="accordion-header" 
		onclick={() => toggle(index)}
		aria-expanded={isExpanded}
		aria-controls="accordion-content-{index}"
	>
		<span class="accordion-title">{title}</span>
		<span class="accordion-icon {isExpanded ? 'accordion-icon--expanded' : ''}">▼</span>
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
		border-bottom: var(--line-thin) solid var(--border-light);
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
		color: var(--text-primary);
		transition: background var(--duration-fast) ease-out;
	}
	
	.accordion-header:hover {
		background: var(--bg-cool);
	}
	
	.accordion-title {
		margin: 0;
	}
	
	.accordion-icon {
		transition: transform var(--duration-fast) ease-out;
	}
	
	.accordion-icon--expanded {
		transform: rotate(180deg);
	}
	
	.accordion-content {
		overflow: hidden;
		transition: max-height var(--duration-base) ease-out;
	}
	
	.accordion-body {
		padding: 0 var(--space-4) var(--space-4) var(--space-4);
	}
</style>