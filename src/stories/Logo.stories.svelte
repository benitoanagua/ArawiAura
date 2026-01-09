<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Logo from '$lib/components/Logo.svelte';

	const { Story } = defineMeta({
		title: 'Components/Logo',
		tags: ['autodocs']
	});

	const logoUrl = 'https://placehold.co/150x50/007bff/white?text=LOGO';
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Default (Image + Text)</h3>
			<div class="demo-box">
				<Logo src={logoUrl} text="BrandName" />
			</div>
		</section>

		<section>
			<h3>Text Only</h3>
			<div class="demo-box">
				<Logo src="" text="BrandName Only" />
			</div>
		</section>

		<section>
			<h3>Image Only</h3>
			<div class="demo-box">
				<Logo src={logoUrl} showText={false} />
			</div>
		</section>

		<section>
			<h3>Sizes</h3>
			<div class="row">
				<Logo src={logoUrl} text="Small" textSize="sm" height={30} width={90} />
				<Logo src={logoUrl} text="Medium" textSize="md" height={50} width={150} />
				<Logo src={logoUrl} text="Large" textSize="lg" height={70} width={210} />
			</div>
		</section>

		<section>
			<h3>Non-Link (Div Wrapper)</h3>
			<div class="demo-box">
				<Logo src={logoUrl} text="Static Logo" href="" />
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
		margin-bottom: 1rem;
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

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		align-items: flex-end;
		padding: 2rem;
		background: var(--color-surface-container-lowest);
		border: var(--line-thin) solid var(--color-outline-variant);
	}
</style>
