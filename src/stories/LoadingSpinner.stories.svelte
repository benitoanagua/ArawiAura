<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	const { Story } = defineMeta({
		title: 'Components/LoadingSpinner',
		tags: ['autodocs']
	});
</script>

<Story name="Spinner Sizes">
	<div class="story-grid">
		<div class="story-section">
			<h2>Spinner Sizes</h2>
			<div class="story-row">
				<div class="spinner-demo">
					<LoadingSpinner size="sm" />
					<span>Small</span>
				</div>

				<div class="spinner-demo">
					<LoadingSpinner size="md" />
					<span>Medium</span>
				</div>

				<div class="spinner-demo">
					<LoadingSpinner size="lg" />
					<span>Large</span>
				</div>
			</div>
		</div>
	</div>
</Story>

<Story name="Color Variants">
	<div class="story-grid">
		<div class="story-section">
			<h2>Color Variants</h2>
			<div class="story-row">
				<div class="spinner-demo">
					<LoadingSpinner color="primary" size="md" />
					<span>Primary</span>
				</div>

				<div class="spinner-demo">
					<LoadingSpinner color="secondary" size="md" />
					<span>Secondary</span>
				</div>

				<div class="spinner-demo">
					<LoadingSpinner color="success" size="md" />
					<span>Success</span>
				</div>

				<div class="spinner-demo">
					<LoadingSpinner color="warning" size="md" />
					<span>Warning</span>
				</div>

				<div class="spinner-demo">
					<LoadingSpinner color="error" size="md" />
					<span>Error</span>
				</div>
			</div>
		</div>
	</div>
</Story>

<Story name="With Overlay">
	<div class="story-grid">
		<div class="story-section">
			<h2>With Overlay</h2>
			<div class="story-row">
				<div class="overlay-demo">
					<LoadingSpinner size="lg" overlay={true} message="Loading content..." />
				</div>
			</div>
		</div>
	</div>
</Story>

<Story name="Fullscreen Loading">
	<div class="story-grid">
		<div class="story-section">
			<h2>Fullscreen Loading</h2>
			<div class="story-row">
				<button
					class="ax-pressable ax-pressable--primary"
					on:click={() => {
						// Simulate fullscreen loading
						const demo = document.querySelector('.fullscreen-demo') as HTMLElement | null;
						if (demo) {
							demo.style.display = 'block';
							setTimeout(() => {
								demo.style.display = 'none';
							}, 3000);
						}
					}}
				>
					Show Fullscreen Loader
				</button>

				<div class="fullscreen-demo" style="display: none;">
					<LoadingSpinner size="lg" fullscreen={true} message="Processing your request..." />
					<div class="ax-card ax-card--elevation-2" style="position: relative; min-height: 200px;">
						<LoadingSpinner size="md" overlay={true} message="Loading data..." />
					</div>
				</div>
			</div>
		</div>
	</div>
</Story>

<style>
	.story-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		padding: var(--space-6);
	}

	.story-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.story-section h2 {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-on-surface);
		margin: 0 0 var(--space-4);
	}

	.story-row {
		display: flex;
		gap: var(--space-6);
		flex-wrap: wrap;
		align-items: center;
	}

	.spinner-demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		min-width: 100px;
	}

	.spinner-demo span {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
	}

	.overlay-demo {
		width: 200px;
		height: 150px;
		background: var(--color-surface-container);
		border-radius: var(--space-3);
		border: var(--line-base) solid var(--color-outline);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fullscreen-demo {
		position: fixed;
		inset: 0;
		z-index: 10000;
	}

	@media (max-width: 768px) {
		.story-row {
			flex-direction: column;
			align-items: flex-start;
		}

		.spinner-demo {
			flex-direction: row;
			justify-content: flex-start;
			width: 100%;
		}
	}
</style>
