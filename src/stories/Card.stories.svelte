<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from '$lib/components/Card.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import type { CardDensity, CardElevation } from '$lib/types/Card.js';

	const { Story } = defineMeta({
		title: 'Components/Card',
		tags: ['autodocs']
	});

	const elevations: CardElevation[] = [0, 1, 2, 3];
	const densities: CardDensity[] = ['compact', 'normal', 'comfortable'];
</script>

<Story name="Core Architecture">
	<div class="story-grid">
		<section>
			<h3>Elevation System</h3>
			<div class="row">
				{#each elevations as elevation}
					<div class="col">
						<Card {elevation}>
							{#snippet body()}
								<div>
									<strong>E-{elevation}</strong>
									{#if elevation === 0}
										<p>Base integration</p>
									{:else if elevation === 1}
										<p>Surface delimitation</p>
									{:else if elevation === 2}
										<p>Focus object</p>
									{:else}
										<p>High authority</p>
									{/if}
								</div>
							{/snippet}
						</Card>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>Slot Architecture</h3>
			<div class="row">
				<div class="col">
					<Card elevation={2}>
						{#snippet top()}
							<strong>Top Slot</strong>
						{/snippet}
						{#snippet body()}
							<p>Body content area</p>
						{/snippet}
						{#snippet footer()}
							<div style="display: flex; gap: var(--space-2);">
								<Pressable variant="outline">Action 1</Pressable>
								<Pressable>Action 2</Pressable>
							</div>
						{/snippet}
					</Card>
				</div>

				<div class="col">
					<Card elevation={1}>
						{#snippet body()}
							<div>
								<strong>Body Only</strong>
								<p>Single slot usage</p>
								<div style="display: flex; gap: var(--space-1); margin-top: var(--space-2);">
									<span
										style="font-size: var(--text-xs); padding: 2px 8px; background: var(--color-surface-variant); border-radius: 12px;"
										>Tag</span
									>
								</div>
							</div>
						{/snippet}
					</Card>
				</div>

				<div class="col">
					<Card elevation={3}>
						{#snippet top()}
							<div style="display: flex; align-items: center; justify-content: space-between;">
								<strong>High Elevation</strong>
								<span style="font-size: var(--text-lg); color: var(--color-primary);">95%</span>
							</div>
						{/snippet}
						{#snippet body()}
							<div style="display: flex; flex-direction: column; gap: var(--space-2);">
								<div
									style="height: 8px; background: var(--color-surface-variant); border-radius: 4px; overflow: hidden;"
								>
									<div style="width: 95%; height: 100%; background: var(--color-primary);"></div>
								</div>
								<p style="margin: 0; font-size: var(--text-sm);">Progress indicator</p>
							</div>
						{/snippet}
					</Card>
				</div>
			</div>
		</section>

		<section>
			<h3>Density Variants</h3>
			<div class="row">
				{#each densities as density}
					<div class="col">
						<Card elevation={2} {density}>
							{#snippet top()}
								<div style="display: flex; align-items: center; gap: var(--space-2);">
									<strong>{density}</strong>
									<span style="font-size: var(--text-xs); text-transform: uppercase;">
										{density === 'compact'
											? '12-16px'
											: density === 'normal'
												? '16-24px'
												: '20-32px'}
									</span>
								</div>
							{/snippet}
							{#snippet body()}
								<p style="margin: 0;">
									{density === 'compact'
										? 'Optimized for lists'
										: density === 'normal'
											? 'Balanced usage'
											: 'Comfortable spacing'}
								</p>
							{/snippet}
						</Card>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>Advanced Patterns</h3>
			<div class="row">
				<div class="col">
					<Card elevation={2}>
						{#snippet top()}
							<div
								style="display: flex; align-items: center; gap: var(--space-3); padding-bottom: var(--space-2); border-bottom: 1px solid var(--color-outline-variant);"
							>
								<div
									style="width: 32px; height: 32px; background: var(--color-surface-variant); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;"
								>
									A
								</div>
								<div>
									<strong>Profile Card</strong>
									<div style="font-size: var(--text-xs); color: var(--color-on-surface-variant);">
										Developer
									</div>
								</div>
							</div>
						{/snippet}
						{#snippet body()}
							<p style="margin: 0;">Complex top slot with avatar</p>
						{/snippet}
					</Card>
				</div>

				<div class="col">
					<Card elevation={1}>
						{#snippet body()}
							<div
								style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2);"
							>
								<div style="width: 12px; height: 12px; background: var(--color-primary);"></div>
								<strong>Task Status</strong>
							</div>
							<p style="margin: 0; font-size: var(--text-sm);">Task with status indicator</p>
						{/snippet}
					</Card>
				</div>
			</div>
		</section>
	</div>
</Story>

<style>
	.story-grid {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background: var(--color-background);
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}

	.row {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.col {
		width: 280px;
		flex-shrink: 0;
	}

	:global(.svelte-storybook) strong {
		color: var(--color-on-surface);
	}

	:global(.svelte-storybook) p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		line-height: 1.4;
	}

	:global(.svelte-storybook) span {
		color: var(--color-on-surface-variant);
	}
</style>
