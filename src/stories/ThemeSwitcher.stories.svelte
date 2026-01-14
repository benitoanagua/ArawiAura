<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Icon from '@iconify/svelte';

	const { Story } = defineMeta({
		title: 'Components/ThemeSwitcher',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import type { Theme } from '$lib/types/ThemeSwitcher.js';

	let currentTheme: Theme = 'auto';
	let showLabel = false;
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Three-Way Toggle</h3>
			<p class="description">
				Cycles through three modes: <Icon
					icon="carbon:settings"
					width="1.2em"
					height="1.2em"
					style="vertical-align: -0.25em; display: inline;"
				/>
				<strong>Auto</strong> →
				<Icon
					icon="carbon:sun"
					width="1.2em"
					height="1.2em"
					style="vertical-align: -0.25em; display: inline;"
				/>
				<strong>Light</strong> →
				<Icon
					icon="carbon:moon"
					width="1.2em"
					height="1.2em"
					style="vertical-align: -0.25em; display: inline;"
				/>
				<strong>Dark</strong>
			</p>
		</section>

		<section>
			<h3>Interactive Example</h3>
			<div class="demo-controls">
				<div class="demo-box">
					<ThemeSwitcher bind:theme={currentTheme} {showLabel} />
				</div>
				<div class="toggle-label">
					<label>
						<input type="checkbox" bind:checked={showLabel} />
						Show Label
					</label>
				</div>
				<p class="current-state">Current: <code>{currentTheme}</code></p>
			</div>
		</section>

		<section>
			<h3>Icon Only Variants</h3>
			<div class="variants-grid">
				<div class="variant">
					<p>Auto</p>
					<div class="demo-box">
						<ThemeSwitcher theme="auto" showLabel={false} />
					</div>
				</div>
				<div class="variant">
					<p>Light</p>
					<div class="demo-box">
						<ThemeSwitcher theme="light" showLabel={false} />
					</div>
				</div>
				<div class="variant">
					<p>Dark</p>
					<div class="demo-box">
						<ThemeSwitcher theme="dark" showLabel={false} />
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3>With Labels</h3>
			<div class="variants-grid">
				<div class="variant">
					<p>Auto (shows system preference)</p>
					<div class="demo-box">
						<ThemeSwitcher theme="auto" showLabel={true} />
					</div>
				</div>
				<div class="variant">
					<p>Light</p>
					<div class="demo-box">
						<ThemeSwitcher theme="light" showLabel={true} />
					</div>
				</div>
				<div class="variant">
					<p>Dark</p>
					<div class="demo-box">
						<ThemeSwitcher theme="dark" showLabel={true} />
					</div>
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
		gap: 2.5rem;
		background: var(--color-surface);
		min-height: 100vh;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}

	.description {
		font-family: var(--font-sans);
		font-size: 0.95rem;
		color: var(--color-on-surface);
		line-height: 1.6;
	}

	.demo-box {
		padding: 2rem;
		background: var(--color-surface-container-lowest);
		border: var(--line-thin) solid var(--color-outline-variant);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: var(--space-1);
	}

	.demo-controls {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.toggle-label {
		display: flex;
		align-items: center;
	}

	.toggle-label label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		color: var(--color-on-surface);
		cursor: pointer;
	}

	.toggle-label input[type='checkbox'] {
		width: 1.1rem;
		height: 1.1rem;
		accent-color: var(--color-primary);
		cursor: pointer;
	}

	.current-state {
		font-family: var(--font-sans);
		font-size: 0.85rem;
		color: var(--color-on-surface-variant);
	}

	.current-state code {
		font-family: var(--font-mono);
		color: var(--color-primary);
		background: var(--color-surface-container-low);
		padding: 0.25rem 0.5rem;
		border-radius: 0.2rem;
	}

	.variants-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}

	.variant {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.variant p {
		font-family: var(--font-sans);
		font-size: 0.85rem;
		color: var(--color-on-surface-variant);
		margin: 0;
	}
</style>
