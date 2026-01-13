<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ToastManager from '$lib/components/ToastManager.svelte';
	import Pressable from '$lib/components/Pressable.svelte';

	const { Story } = defineMeta({
		title: 'Components/Toast',
		tags: ['autodocs']
	});

	// Demo functions to trigger different toast types
	function showSuccessToast() {
		window.toast?.success('Operation completed successfully!', 3000);
	}

	function showErrorToast() {
		window.toast?.error('Something went wrong. Please try again.', 4000);
	}

	function showWarningToast() {
		window.toast?.warning('This action cannot be undone', 3500);
	}

	function showInfoToast() {
		window.toast?.info('New message received', 2500);
	}
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Toast Types</h3>
			<div class="row">
				<Pressable onclick={showSuccessToast} variant="primary">Success</Pressable>
				<Pressable onclick={showErrorToast} variant="secondary">Error</Pressable>
				<Pressable onclick={showWarningToast} variant="outline">Warning</Pressable>
				<Pressable onclick={showInfoToast} variant="ghost">Info</Pressable>
			</div>
		</section>
	</div>
</Story>

<ToastManager />

<style>
	.story-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem;
		min-height: 100vh;
		background-color: var(--color-background);
		color: var(--color-on-background);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}
</style>