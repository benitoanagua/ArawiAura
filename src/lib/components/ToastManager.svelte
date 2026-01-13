<script lang="ts">
	import Toast from './Toast.svelte';
	import type { ToastNotification, ToastOptions } from '$lib/types/toast';
	import { nanoid } from 'nanoid';

	let toasts = $state<ToastNotification[]>([]);

	function showToast(options: ToastOptions): string {
		const id = options.id || nanoid();
		const toast: ToastNotification = {
			...options,
			id
		};

		toasts = [...toasts, toast];

		return id;
	}

	function removeToast(id: string) {
		toasts = toasts.filter(toast => toast.id !== id);
	}

	// Convenience methods
	function success(message: string, duration?: number) {
		return showToast({ message, type: 'success', duration });
	}

	function error(message: string, duration?: number) {
		return showToast({ message, type: 'error', duration });
	}

	function warning(message: string, duration?: number) {
		return showToast({ message, type: 'warning', duration });
	}

	function info(message: string, duration?: number) {
		return showToast({ message, type: 'info', duration });
	}

	function clearAll() {
		toasts = [];
	}

	// Make methods available globally
	if (typeof window !== 'undefined') {
		window.toast = {
			show: showToast,
			success,
			error,
			warning,
			info,
			clear: clearAll
		};
	}
</script>

<div class="ax-toast-container">
	{#each toasts as toast (toast.id)}
		<Toast
			id={toast.id}
			message={toast.message}
			type={toast.type}
			duration={toast.duration}
			onRemove={removeToast}
		/>
	{/each}
</div>

<style>
	.ax-toast-container {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1000;
		pointer-events: none;
	}

	/* Toast items handle their own pointer events */
</style>