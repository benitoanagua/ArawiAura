<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Offcanvas from '$lib/components/Offcanvas.svelte';
	import Pressable from '$lib/components/Pressable.svelte';

	const { Story } = defineMeta({
		title: 'Components/Offcanvas',
		tags: ['autodocs'],
		argTypes: {
			open: { control: 'boolean' },
			position: { control: 'radio', options: ['left', 'right'] }
		}
	});
</script>

<script>
	let openLeft = false;
	let openRight = false;
</script>

<Story name="Interactive Demo">
	<div class="demo-container">
		<Pressable onclick={() => (openLeft = true)}>Open Left Offcanvas</Pressable>
		<Pressable onclick={() => (openRight = true)}>Open Right Offcanvas</Pressable>

		<Offcanvas bind:open={openLeft} position="left">
			<h3>Left Panel</h3>
			<p>This is the content of the left offcanvas.</p>
			<nav>
				<a href="/">Link 1</a>
				<a href="/">Link 2</a>
				<a href="/">Link 3</a>
			</nav>
		</Offcanvas>

		<Offcanvas bind:open={openRight} position="right">
			<h3>Right Panel</h3>
			<p>This is the content of the right offcanvas.</p>
		</Offcanvas>
	</div>
</Story>

<style>
	.demo-container {
		display: flex;
		gap: 1rem;
		padding: 2rem;
	}
	nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	a {
		color: var(--color-primary);
		text-decoration: none;
	}
</style>
