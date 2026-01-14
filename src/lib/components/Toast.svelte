<script lang="ts">
	import type { ToastType } from '$lib/types/Toast';

	interface ToastProps {
		id: string;
		message: string;
		type?: ToastType;
		duration?: number;
		onRemove: (id: string) => void;
	}

	const {
		id,
		message,
		type = 'info',
		duration = 5000,
		onRemove
	}: ToastProps = $props();

	let toastElement: HTMLElement;
	let isVisible = $state(false);

	// Icon mapping for different toast types
	const icons = {
		success: '✓',
		error: '✕',
		warning: '⚠',
		info: 'ℹ'
	};

	const typeStyles = {
		success: 'toast--success',
		error: 'toast--error',
		warning: 'toast--warning',
		info: 'toast--info'
	};

	// Auto-remove after duration
	$effect(() => {
		isVisible = true;
		const timer = setTimeout(() => {
			removeToast();
		}, duration);

		return () => clearTimeout(timer);
	});

	function removeToast() {
		isVisible = false;
		setTimeout(() => {
			onRemove(id);
		}, 300); // Wait for exit animation
	}
</script>

<div
	class="ax-toast ax-toast--{type} {typeStyles[type]} {isVisible ? 'ax-toast--visible' : 'ax-toast--hidden'}"
	bind:this={toastElement}
	role="alert"
	aria-live="polite"
>
	<div class="ax-toast__content">
		<span class="ax-toast__icon" aria-hidden="true">{icons[type]}</span>
		<span class="ax-toast__message">{message}</span>
		<button
			class="ax-toast__close"
			onclick={removeToast}
			aria-label="Close notification"
		>
			✕
		</button>
	</div>
</div>

<style>
	.ax-toast {
		position: fixed;
		top: var(--space-4);
		right: var(--space-4);
		z-index: 1000;
		min-width: 320px;
		max-width: 480px;
		padding: var(--space-3);
		border: var(--line-thin) solid var(--stroke-medium);
		border-radius: clamp(4px, 1vw, 8px);
		background-color: var(--color-surface-container);
		color: var(--color-on-surface);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transform: translateX(100%);
		opacity: 0;
		transition: all var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
	}

	.ax-toast--visible {
		transform: translateX(0);
		opacity: 1;
	}

	.ax-toast--hidden {
		transform: translateX(100%);
		opacity: 0;
	}

	/* Type-specific styles using architectural outline tokens */
	.ax-toast--success {
		border-color: var(--color-primary);
		background-color: var(--color-surface-container-low);
	}

	.ax-toast--error {
		border-color: var(--color-error);
		background-color: var(--color-error-container);
		color: var(--color-on-error-container);
	}

	.ax-toast--warning {
		border-color: var(--color-tertiary);
		background-color: var(--color-tertiary-container);
		color: var(--color-on-tertiary-container);
	}

	.ax-toast--info {
		border-color: var(--color-secondary);
		background-color: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
	}

	.ax-toast__content {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
	}

	.ax-toast__icon {
		flex-shrink: 0;
		font-weight: 600;
		font-size: var(--text-lg);
		line-height: 1;
	}

	.ax-toast__message {
		flex: 1;
		padding-top: var(--space-0-5);
	}

	.ax-toast__close {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		padding: 0;
		border: var(--line-thin) solid transparent;
		background: none;
		color: inherit;
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		border-radius: var(--line-thin);
		transition: all var(--duration-fast);
	}

	.ax-toast__close:hover {
		border-color: var(--stroke-medium);
		background-color: var(--color-surface-container-high);
	}

	.ax-toast__close:focus {
		outline: var(--line-thin) solid var(--ring-color);
		outline-offset: var(--ring-offset);
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.ax-toast {
			left: var(--space-2);
			right: var(--space-2);
			min-width: auto;
			max-width: calc(100vw - var(--space-4));
		}
	}

	/* Animation keyframes */
	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slideOut {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(100%);
			opacity: 0;
		}
	}
</style>