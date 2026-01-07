<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { ModalMaxWidth, ModalProps } from '$lib/types/modal.js';
	
	export let open: boolean = false;
	export let title: string = '';
	export let closable: boolean = true;
	export let backdrop: boolean = true;
	export let maxWidth: ModalMaxWidth = 'md';
	
	let modalRef: HTMLElement | null = null;
	let show = false;
	
	// Prevent scrolling when modal is open
	let originalOverflow: string;
	
	onMount(() => {
		if (open) {
			showModal();
		}
	});
	
	onDestroy(() => {
		if (show) {
			document.body.style.overflow = originalOverflow;
		}
	});
	
	$: if (open && !show) {
		showModal();
	} else if (!open && show) {
		closeModal();
	}
	
	function showModal() {
		show = true;
		originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	}
	
	function closeModal() {
		show = false;
		document.body.style.overflow = originalOverflow;
		
		// Trigger close event
		dispatchEvent(new CustomEvent('close', { bubbles: true }));
	}
	
	function handleBackdropClick(e: Event) {
		if (backdrop && e.target === e.currentTarget && closable) {
			closeModal();
		}
	}
	
	function handleEscapeKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && closable) {
			closeModal();
		}
	}
	
	function handleOutsideClick(e: MouseEvent) {
		if (closable && modalRef && !modalRef.contains(e.target as Node)) {
			closeModal();
		}
	}
	
	// Add keyboard event listener
	onMount(() => {
		window.addEventListener('keydown', handleEscapeKey);
		return () => window.removeEventListener('keydown', handleEscapeKey);
	});
</script>

{#if show}
	<div 
		class="modal-backdrop {backdrop ? '' : 'modal-backdrop--transparent'}" 
		on:click={handleBackdropClick}
		role="button"
		tabindex="-1"
		on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleBackdropClick(e)}
	>
		<div 
			class="modal-content modal-content--{maxWidth}"
			bind:this={modalRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabindex="-1"
		>
			{#if title}
				<div class="modal-header">
					<h2 id="modal-title" class="modal-title">{title}</h2>
					{#if closable}
						<button 
							class="modal-close-button" 
							aria-label="Close modal"
							on:click={closeModal}
						>
							×
						</button>
					{/if}
				</div>
			{/if}
			
			<div class="modal-body">
				<slot />
			</div>
			
			{#if closable && !title}
				<button 
					class="modal-close-button modal-close-button--floating" 
					aria-label="Close modal"
					on:click={closeModal}
				>
					×
				</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		animation: fadeIn 0.2s ease-out;
	}
	
	.modal-backdrop--transparent {
		background: transparent;
	}
	
	.modal-content {
		background: var(--bg-white);
		border-radius: var(--space-3);
		box-shadow: var(--shadow-lg);
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		animation: slideIn 0.2s ease-out;
		outline: none;
	}
	
	.modal-content--sm { max-width: 20rem; }
	.modal-content--md { max-width: 28rem; }
	.modal-content--lg { max-width: 36rem; }
	.modal-content--xl { max-width: 48rem; }
	
	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-4);
		border-bottom: var(--line-thin) solid var(--border-light);
	}
	
	.modal-title {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		font-weight: 600;
		margin: 0;
		color: var(--text-primary);
	}
	
	.modal-close-button {
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
	}
	
	.modal-close-button:hover {
		background: var(--bg-cool);
		color: var(--text-primary);
	}
	
	.modal-close-button--floating {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
	}
	
	.modal-body {
		padding: var(--space-4);
		overflow-y: auto;
		flex: 1;
	}
	
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	
	@keyframes slideIn {
		from { 
			transform: translateY(-50px) scale(0.95); 
			opacity: 0;
		}
		to { 
			transform: translateY(0) scale(1); 
			opacity: 1;
		}
	}
</style>