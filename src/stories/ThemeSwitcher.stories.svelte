<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	const { Story } = defineMeta({
		title: 'Components/ThemeSwitcher',
		tags: ['autodocs']
	});
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Default (with Label)</h3>
			<div class="demo-box">
				<ThemeSwitcher />
			</div>
		</section>

		<section>
			<h3>Icon Only</h3>
			<div class="demo-box">
				<ThemeSwitcher showLabel={false} />
			</div>
		</section>

		<section>
			<h3>Custom Label / Content</h3>
			<div class="demo-box">
				<ThemeSwitcher showLabel={false}>
					<span style="font-family: var(--font-sans); color: var(--color-on-surface); font-size: 0.75rem; font-weight: 500;">
						Toggle Mode
					</span>
				</ThemeSwitcher>
			</div>
		</section>
	</div>
</Story>

<style>
	.story-grid {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		background: var(--color-surface);
		min-height: 100vh;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}

	.demo-box {
		padding: 2rem;
		background: var(--color-surface-container-lowest);
		border: var(--line-thin) solid var(--color-outline-variant);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
