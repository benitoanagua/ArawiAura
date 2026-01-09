<script lang="ts">
	import { onMount } from 'svelte';
	import type { ModalProps } from '$lib/types/modal.js';

	let {
		open = $bindable(false),
		title = '',
		closable = true,
		backdrop = true,
		maxWidth = 'md',
		children,
		class: className
	}: ModalProps = $props();

	let dialogRef = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		if (open) {
			dialogRef?.showModal();
			document.body.style.overflow = 'hidden';
		} else {
			dialogRef?.close();
			document.body.style.overflow = '';
		}
	});

	function handleClose() {
		open = false;
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === dialogRef && backdrop && closable) {
			handleClose();
		}
	}

	onMount(() => {
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialogRef}
	class="ax-modal ax-modal--{maxWidth} {className || ''}"
	onclose={handleClose}
	onclick={handleBackdropClick}
>
	<div class="ax-modal__inner">
		{#if title || closable}
			<div class="ax-modal__header">
				{#if title}
					<h2 class="ax-modal__title">{title}</h2>
				{/if}
				{#if closable}
					<button class="ax-modal__close" onclick={handleClose} aria-label="Close modal">
						<svg viewBox="0 0 24 24" width="24" height="24">
							<path
								fill="currentColor"
								d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
							/>
						</svg>
					</button>
				{/if}
			</div>
		{/if}

		<div class="ax-modal__body">
			{@render children?.()}
		</div>
	</div>
</dialog>

<style>
	.ax-modal {
		padding: 0;
		border: none;
		background: none;
		max-width: none;
		max-height: none;
		outline: none;
		color: var(--color-on-surface);
	}

	.ax-modal::backdrop {
		background: rgba(var(--color-scrim), 0.5);
		backdrop-filter: blur(4px);
		animation: ax-fade-in var(--duration-base) var(--ease-out);
	}

	.ax-modal__inner {
		background: var(--color-surface);
		border: var(--line-thin) solid var(--color-outline-variant);
		border-radius: var(--space-1);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow: var(--shadow-4);
		margin: auto;
		animation: ax-modal-in var(--duration-base) var(--ease-out);
		position: relative;
	}

	/* Sizes */
	.ax-modal--sm .ax-modal__inner {
		width: 320px;
	}
	.ax-modal--md .ax-modal__inner {
		width: 560px;
	}
	.ax-modal--lg .ax-modal__inner {
		width: 800px;
	}
	.ax-modal--xl .ax-modal__inner {
		width: 1140px;
	}

	.ax-modal__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6);
		background-color: var(--color-surface-container-low);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
	}

	.ax-modal__title {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
		margin: 0;
	}

	.ax-modal__close {
		background: none;
		border: var(--line-thin) solid var(--color-outline-variant);
		color: var(--color-on-surface-variant);
		cursor: pointer;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		transition: all var(--duration-fast) var(--ease-out);
		/* Zero Displacement: Focus ring as inset shadow */
		box-shadow: inset 0 0 0 0 var(--color-primary);
	}

	.ax-modal__close:hover {
		background-color: var(--color-error-container);
		color: var(--color-on-error-container);
		border-color: var(--color-error);
	}

	.ax-modal__close:focus-visible {
		box-shadow: inset 0 0 0 2px var(--color-primary);
	}

	.ax-modal__body {
		padding: var(--space-6);
		overflow-y: auto;
		max-height: 80vh;
		font-family: var(--font-sans);
		line-height: var(--leading-relaxed);
	}

	@keyframes ax-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes ax-modal-in {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
