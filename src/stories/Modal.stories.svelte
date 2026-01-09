<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from '$lib/components/Modal.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import * as falso from '@ngneat/falso';

	const { Story } = defineMeta({
		title: 'Components/Modal',
		tags: ['autodocs']
	});

	const createModalData = () => ({
		title: falso.randSentence(),
		content: Array.from({ length: 2 }, () => falso.randParagraph())
	});

	const modalData = createModalData();
</script>

<script lang="ts">
	let smOpen = $state(false);
	let mdOpen = $state(false);
	let lgOpen = $state(false);
	let xlOpen = $state(false);
	let customOpen = $state(false);
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Sizing Variants</h3>
			<p>Click the buttons below to trigger modals of different widths.</p>
			<div class="demo-grid">
				<Pressable variant="outline" onclick={() => (smOpen = true)}>Open Small (sm)</Pressable>
				<Pressable variant="outline" onclick={() => (mdOpen = true)}>Open Medium (md)</Pressable>
				<Pressable variant="outline" onclick={() => (lgOpen = true)}>Open Large (lg)</Pressable>
				<Pressable variant="outline" onclick={() => (xlOpen = true)}
					>Open Extra Large (xl)</Pressable
				>
			</div>
		</section>

		<section>
			<h3>Content Variations</h3>
			<div class="demo-grid">
				<Pressable variant="primary" onclick={() => (customOpen = true)}
					>Open Custom Content</Pressable
				>
			</div>
		</section>

		<!-- Modal Instances -->
		<Modal bind:open={smOpen} title="Small Modal" maxWidth="sm">
			<p>{modalData.content[0]}</p>
		</Modal>

		<Modal bind:open={mdOpen} title="Medium Modal (Default)" maxWidth="md">
			<p>{modalData.content[0]}</p>
			<p>{modalData.content[1]}</p>
		</Modal>

		<Modal bind:open={lgOpen} title="Large Modal" maxWidth="lg">
			<p>{modalData.content[0]}</p>
			<div class="placeholder-box"></div>
			<p>{modalData.content[1]}</p>
		</Modal>

		<Modal bind:open={xlOpen} title="Extra Large Modal" maxWidth="xl">
			<div class="xl-content">
				<div class="placeholder-box wide"></div>
				<div class="text-columns">
					<p>{modalData.content[0]}</p>
					<p>{modalData.content[1]}</p>
				</div>
			</div>
		</Modal>

		<Modal bind:open={customOpen} closable={false} backdrop={true}>
			<div class="custom-modal">
				<h3>Action Required</h3>
				<p>
					This modal is not closable via the standard X button. You must take an action or press
					ESC.
				</p>
				<div class="actions">
					<Pressable variant="outline" onclick={() => (customOpen = false)}>Cancel</Pressable>
					<Pressable variant="primary" onclick={() => (customOpen = false)}>Proceed</Pressable>
				</div>
			</div>
		</Modal>
	</div>
</Story>

<style>
	.story-grid {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		background: var(--color-background);
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

	.demo-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}

	.placeholder-box {
		height: 200px;
		background: var(--color-surface-container-high);
		border: 1px dashed var(--color-outline);
		margin: 1rem 0;
	}

	.placeholder-box.wide {
		height: 300px;
	}

	.text-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.custom-modal {
		text-align: center;
	}

	.custom-modal h3 {
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	p {
		margin-bottom: 1rem;
		color: var(--color-on-surface);
	}
</style>
