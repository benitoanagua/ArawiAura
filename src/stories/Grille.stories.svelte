<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Grille from '$lib/components/Grille.svelte';
	import GrilleItem from '$lib/components/GrilleItem.svelte';

	const { Story } = defineMeta({
		title: 'Components/Grille',
		tags: ['autodocs'],
		argTypes: {
			desktop: { control: { type: 'number', min: 1, max: 6 } },
			mobile: { control: { type: 'number', min: 1, max: 4 } },
			gap: { control: 'select', options: ['small', 'medium', 'large'] }
		}
	});
</script>

<Story name="Blueprint Overview">
	<div class="story-container">
		<section>
			<h3>Standard Grid (Desktop 3, Mobile 2)</h3>
			<div class="grille-demo">
				<Grille desktop={3} mobile={2} gap="medium">
					{#each Array(6) as _, i}
						<GrilleItem>
							<div class="placeholder">Item {i + 1}</div>
						</GrilleItem>
					{/each}
				</Grille>
			</div>
		</section>

		<section>
			<h3>Sparse Grid (Desktop 4, Mobile 1, Gap Small)</h3>
			<div class="grille-demo">
				<Grille desktop={4} mobile={1} gap="small">
					{#each Array(5) as _, i}
						<GrilleItem>
							<div class="placeholder">Item {i + 1}</div>
						</GrilleItem>
					{/each}
				</Grille>
			</div>
		</section>

		<section>
			<h3>Large Gap & Dense Grid</h3>
			<div class="grille-demo">
				<Grille desktop={6} mobile={3} gap="large">
					{#each Array(12) as _, i}
						<GrilleItem>
							<div class="placeholder">I{i + 1}</div>
						</GrilleItem>
					{/each}
				</Grille>
			</div>
		</section>
	</div>
</Story>

<style>
	.story-container {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 4rem;
		background: var(--color-background);
		min-height: 100vh;
	}

	.grille-demo {
		border: 1px dashed var(--color-outline);
		padding: 2px;
	}

	.placeholder {
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface-container-low);
		color: var(--color-on-surface-variant);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		text-transform: uppercase;
		width: 100%;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}
</style>
