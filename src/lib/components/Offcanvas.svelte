<script lang="ts">
	import type { OffcanvasProps } from '$lib/types/offcanvas.js';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let {
		open = $bindable(false),
		position = 'left',
		children,
		class: className,
		onclose
	}: OffcanvasProps = $props();

	function handleClose() {
		open = false;
		onclose?.();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="ax-offcanvas {className || ''}" role="dialog" aria-modal="true">
		<!-- Backdrop -->
		<div
			class="ax-offcanvas__backdrop"
			transition:fade={{ duration: 200 }}
			onclick={handleClose}
			role="presentation"
		></div>

		<!-- Panel -->
		<div
			class="ax-offcanvas__panel ax-offcanvas__panel--{position}"
			transition:fly={{
				x: position === 'left' ? -100 : 100,
				duration: 300,
				easing: cubicOut,
				opacity: 1
			}}
		>
			<button class="ax-offcanvas__close" onclick={handleClose} aria-label="Close offcanvas">
				<span class="ax-offcanvas__close-icon"></span>
			</button>

			<div class="ax-offcanvas__content">
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}

<style>
	.ax-offcanvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 200;
		display: flex;
		pointer-events: none; /* Let clicks pass through if container has no background (though here we have backdrop) */
	}

	.ax-offcanvas__backdrop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);
		pointer-events: auto;
	}

	.ax-offcanvas__panel {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 80%;
		max-width: 320px;
		background-color: var(--color-surface);
		box-shadow: var(--shadow-xl);
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		border-right: var(--line-thin) solid var(--color-outline-variant);
	}

	.ax-offcanvas__panel--left {
		left: 0;
		border-right: var(--line-thin) solid var(--color-outline-variant);
	}

	.ax-offcanvas__panel--right {
		right: 0;
		border-left: var(--line-thin) solid var(--color-outline-variant);
		border-right: none;
	}

	.ax-offcanvas__close {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-on-surface-variant);
		border-radius: 50%;
		transition: all var(--duration-fast) ease;
		z-index: 10;
	}

	.ax-offcanvas__close:hover {
		background-color: var(--color-surface-container-high);
		color: var(--color-on-surface);
	}

	.ax-offcanvas__close-icon {
		width: 16px;
		height: 16px;
		position: relative;
	}

	.ax-offcanvas__close-icon::before,
	.ax-offcanvas__close-icon::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 2px;
		background-color: currentColor;
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.ax-offcanvas__close-icon::after {
		transform: translate(-50%, -50%) rotate(-45deg);
	}

	.ax-offcanvas__content {
		padding: var(--space-6);
		overflow-y: auto;
		flex: 1;
	}
</style>
