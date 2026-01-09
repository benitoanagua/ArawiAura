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
						<button class="modal-close-button" aria-label="Close modal" on:click={closeModal}>
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
		background: rgba(var(--color-scrim), 0.6);
		backdrop-filter: blur(2px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.modal-backdrop--transparent {
		background: transparent;
		backdrop-filter: none;
	}

	.modal-content {
		background: var(--color-surface);
		border: var(--line-thin) solid var(--color-outline);
		border-radius: var(--space-1);
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
		position: relative;
	}

	.modal-content--sm {
		width: 20rem;
	}
	.modal-content--md {
		width: 32rem;
	}
	.modal-content--lg {
		width: 44rem;
	}
	.modal-content--xl {
		width: 60rem;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-4) var(--space-6);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
		background-color: var(--color-surface-container-low);
	}

	.modal-title {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		margin: 0;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.modal-close-button {
		background: none;
		border: 1px solid var(--color-outline-variant);
		font-size: var(--text-2xl);
		color: var(--color-on-surface-variant);
		cursor: pointer;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--duration-fast) ease-out;
		padding: 0;
	}

	.modal-close-button:hover {
		background: var(--color-error-container);
		color: var(--color-on-error-container);
		border-color: var(--color-error);
	}

	.modal-close-button:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
		outline: none;
	}

	.modal-close-button--floating {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		background: var(--color-surface);
		z-index: 20;
	}

	.modal-body {
		padding: var(--space-6);
		overflow-y: auto;
		flex: 1;
		font-family: var(--font-sans);
		line-height: var(--leading-relaxed);
		color: var(--color-on-surface);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			transform: scale(0.98) translateY(10px);
			opacity: 0;
		}
		to {
			transform: scale(1) translateY(0);
			opacity: 1;
		}
	}
</style>
