<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Drop from '$lib/components/Drop.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Icon from '@iconify/svelte';

	const { Story } = defineMeta({
		title: 'Components/Drop',
		tags: ['autodocs']
	});

	// Sample options for demonstration
	const userOptions = [
		{ label: 'Profile', iconComponent: 'carbon:user', href: '/profile' },
		{ label: 'Settings', iconComponent: 'carbon:settings', href: '/settings' },
		{ divider: true },
		{ label: 'Logout', iconComponent: 'carbon:logout', value: 'logout' }
	];

	const simpleOptions = [
		{ label: 'Option 1', value: 'opt1' },
		{ label: 'Option 2', value: 'opt2' },
		{ label: 'Option 3', value: 'opt3' }
	];

	const disabledOptions = [
		{ label: 'Available Option', value: 'available' },
		{ label: 'Disabled Option', value: 'disabled', disabled: true },
		{ label: 'Another Option', value: 'another' }
	];

	function handleUserSelect(option: any) {
		if (option.value === 'logout') {
			window.toast?.success('Logged out successfully');
		} else {
			window.toast?.info(`Selected: ${option.label}`);
		}
	}

	function handleSimpleSelect(option: any) {
		window.toast?.info(`Selected: ${option.label}`);
	}
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>User Menu</h3>
			<div class="demo-area">
				<Drop 
					options={userOptions} 
					onSelect={handleUserSelect}
				>
					<Pressable variant="ghost">
						John Doe 
						<Icon icon="carbon:chevron-down" width="1.2em" height="1.2em" />
					</Pressable>
				</Drop>
			</div>
		</section>

		<section>
			<h3>Simple Options</h3>
			<div class="demo-area">
				<Drop 
					options={simpleOptions} 
					onSelect={handleSimpleSelect}
				>
					<Pressable variant="outline">
						Actions 
						<Icon icon="carbon:chevron-down" width="1.2em" height="1.2em" />
					</Pressable>
				</Drop>
			</div>
		</section>

		<section>
			<h3>With Disabled Items</h3>
			<div class="demo-area">
				<Drop 
					options={disabledOptions} 
					onSelect={handleSimpleSelect}
				>
					<Pressable variant="secondary">
						Menu 
						<Icon icon="carbon:chevron-down" width="1.2em" height="1.2em" />
					</Pressable>
				</Drop>
			</div>
		</section>

		<section>
			<h3>Alignment Options</h3>
			<div class="demo-area alignment-demo">
				<div class="alignment-row">
					<Drop 
						options={simpleOptions} 
						align="left"
						onSelect={handleSimpleSelect}
					>
						<Pressable variant="ghost" size="sm">
							Left Align 
							<Icon icon="carbon:chevron-down" width="1.2em" height="1.2em" />
						</Pressable>
					</Drop>
					
					<Drop 
						options={simpleOptions} 
						align="right"
						onSelect={handleSimpleSelect}
					>
						<Pressable variant="ghost" size="sm">
							Right Align 
							<Icon icon="carbon:chevron-down" width="1.2em" height="1.2em" />
						</Pressable>
					</Drop>
				</div>
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

	section h3 {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}

	.demo-area {
		padding: 1.5rem;
		background: var(--color-surface-container-lowest);
		border: var(--line-thin) solid var(--color-outline-variant);
		border-radius: var(--space-2);
		display: flex;
		justify-content: center;
	}

	.alignment-demo {
		padding: 2rem;
	}

	.alignment-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 300px;
	}

	@media (max-width: 640px) {
		.story-grid {
			padding: 1rem;
			gap: 1.5rem;
		}

		.demo-area {
			padding: 1rem;
		}

		.alignment-row {
			flex-direction: column;
			gap: 1rem;
			max-width: 200px;
		}
	}
</style>