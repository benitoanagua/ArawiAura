<script lang="ts">
	import type { OverlayProps } from '$lib/types/overlay.js';
	
	export let open: boolean = false;
	export let backdrop: boolean = true;
	export let closable: boolean = true;
	export let zIndex: number = 1000;
	
	let show = false;
	
	$: if (open && !show) {
		show = true;
	} else if (!open && show) {
		show = false;
	}
	
	function closeOverlay() {
		if (closable) {
			show = false;
			// Dispatch close event
			dispatchEvent(new CustomEvent('close', { bubbles: true }));
		}
	}
	
	function handleBackdropClick() {
		if (backdrop && closable) {
			closeOverlay();
		}
	}
</script>

{#if show}
	<div 
		class="overlay-backdrop" 
		style:z-index={zIndex}
		on:click={handleBackdropClick}
		role="button"
		on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleBackdropClick()}
		tabindex="-1"
	>
		<div 
			class="overlay-content" 
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			on:click|stopPropagation={() => {}}
			on:keydown={(e) => e.stopPropagation()}
		>
			<slot {closeOverlay} />
			
			{#if closable}
				<button 
					class="overlay-close" 
					on:click={closeOverlay}
					aria-label="Close overlay"
				>
					×
				</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	.overlay-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		animation: fadeIn 0.2s ease-out;
	}
	
	.overlay-content {
		position: relative;
		background: var(--bg-white);
		border-radius: var(--space-2);
		box-shadow: var(--shadow-lg);
		max-height: 90vh;
		overflow: auto;
	}
	
	.overlay-close {
		position: absolute;
		top: var(--space-2);
		right: var(--space-2);
		background: none;
		border: none;
		font-size: var(--text-xl);
		color: var(--text-muted);
		cursor: pointer;
		padding: var(--space-1);
		border-radius: var(--space-1);
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--duration-fast) ease-out;
		z-index: 10;
	}
	
	.overlay-close:hover {
		background: var(--bg-cool);
		color: var(--text-primary);
	}
	
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>