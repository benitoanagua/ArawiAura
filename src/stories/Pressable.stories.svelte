<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Pressable from '$lib/components/Pressable.svelte';
	import type { PressableVariant, PressableSize } from '$lib/types/pressable.js';

	const { Story } = defineMeta({
		title: 'Components/Pressable',
		component: Pressable,
		tags: ['autodocs']
	});

	const variants: PressableVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'link'];
	const sizes: PressableSize[] = ['sm', 'md', 'lg'];
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>By Variant</h3>
			<div class="row">
				{#each variants as variant}
					<Pressable {variant}>{variant}</Pressable>
				{/each}
			</div>
		</section>

		<section>
			<h3>By Size (Primary)</h3>
			<div class="row">
				{#each sizes as size}
					<Pressable variant="primary" {size}>{size}</Pressable>
				{/each}
			</div>
		</section>

		<section>
			<h3>States</h3>
			<div class="row">
				<Pressable variant="primary" disabled>Disabled</Pressable>
				<Pressable variant="outline" disabled>Disabled Outline</Pressable>
				<Pressable variant="link" disabled>Disabled Link</Pressable>
			</div>
		</section>

		<section>
			<h3>Full Width</h3>
			<div style="width: 400px; border: 1px dashed var(--color-outline-variant); padding: 1rem;">
				<Pressable variant="primary" fullWidth>Full Width Pressable</Pressable>
			</div>
		</section>

		<section>
			<h3>As Link (Navigation)</h3>
			<div class="row">
				<Pressable variant="link" href="https://google.com">External Link</Pressable>
				<Pressable variant="primary" href="/local-path">Pressable Styled Link</Pressable>
			</div>
		</section>
	</div>
</Story>

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
