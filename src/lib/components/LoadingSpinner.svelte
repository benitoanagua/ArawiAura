<script lang="ts">
	import type { SpinnerProps } from '$lib/types/LoadingSpinner';

	let {
		size = 'md',
		color = 'primary',
		fullscreen = false,
		overlay = false,
		message = ''
	}: SpinnerProps = $props();
</script>

{#if fullscreen || overlay}
	<div class="ax-spinner-overlay {fullscreen ? 'ax-spinner-overlay--fullscreen' : ''}">
		<div class="ax-spinner-container">
			<div class="ax-spinner ax-spinner--{size} ax-spinner--{color}">
				<div class="ax-spinner__ring"></div>
				<div class="ax-spinner__ring"></div>
				<div class="ax-spinner__ring"></div>
			</div>
			{#if message}
				<p class="ax-spinner__message">{message}</p>
			{/if}
		</div>
	</div>
{:else}
	<div class="ax-spinner ax-spinner--{size} ax-spinner--{color}">
		<div class="ax-spinner__ring"></div>
		<div class="ax-spinner__ring"></div>
		<div class="ax-spinner__ring"></div>
	</div>
{/if}

<style>
	/* Overlay - Blueprint Grid */
	.ax-spinner-overlay {
		position: absolute;
		inset: 0;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(2px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.ax-spinner-overlay--fullscreen {
		position: fixed;
	}

	.ax-spinner-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
	}

	/* Spinner - Mechanical Precision */
	.ax-spinner {
		display: inline-block;
		position: relative;
		width: 40px;
		height: 40px;
	}

	/* Size Variants - Dynamic Geometry */
	.ax-spinner--sm {
		width: 24px;
		height: 24px;
	}

	.ax-spinner--md {
		width: 40px;
		height: 40px;
	}

	.ax-spinner--lg {
		width: 64px;
		height: 64px;
	}

	/* Rings - Industrial Components */
	.ax-spinner__ring {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		border: 3px solid;
		border-radius: 50%;
		animation: ax-spinner-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: currentColor transparent transparent transparent;
	}

	.ax-spinner__ring:nth-child(1) {
		animation-delay: -0.45s;
	}

	.ax-spinner__ring:nth-child(2) {
		animation-delay: -0.3s;
	}

	.ax-spinner__ring:nth-child(3) {
		animation-delay: -0.15s;
	}

	/* Color Variants - Monochrome Structure */
	.ax-spinner--primary {
		color: var(--color-primary);
	}

	.ax-spinner--secondary {
		color: var(--color-secondary);
	}

	.ax-spinner--success {
		color: var(--color-success);
	}

	.ax-spinner--warning {
		color: var(--color-warning);
	}

	.ax-spinner--error {
		color: var(--color-error);
	}

	.ax-spinner--inherit {
		color: inherit;
	}

	/* Message - Supporting Text */
	.ax-spinner__message {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		margin: 0;
		text-align: center;
		max-width: 200px;
	}

	/* Animations - GPU Accelerated */
	@keyframes ax-spinner-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* Pulse Alternative */
	.ax-spinner--pulse .ax-spinner__ring {
		animation: ax-spinner-pulse 1s ease-in-out infinite;
		border-color: currentColor;
		opacity: 0.3;
	}

	.ax-spinner--pulse .ax-spinner__ring:nth-child(1) {
		animation-delay: -0.3s;
	}

	.ax-spinner--pulse .ax-spinner__ring:nth-child(2) {
		animation-delay: -0.15s;
	}

	@keyframes ax-spinner-pulse {
		0%,
		100% {
			transform: scale(0.8);
			opacity: 0.3;
		}
		50% {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* Bounce Alternative */
	.ax-spinner--bounce {
		width: 24px;
		height: 24px;
		position: relative;
	}

	.ax-spinner--bounce::before,
	.ax-spinner--bounce::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: currentColor;
		opacity: 0.6;
		animation: ax-spinner-bounce 2s infinite ease-in-out;
	}

	.ax-spinner--bounce::after {
		animation-delay: -1s;
	}

	@keyframes ax-spinner-bounce {
		0%,
		100% {
			transform: scale(0);
		}
		50% {
			transform: scale(1);
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		.ax-spinner--lg {
			width: 48px;
			height: 48px;
		}

		.ax-spinner__message {
			font-size: var(--text-xs);
		}
	}
</style>
