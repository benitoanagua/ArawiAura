<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let showForm = $state(false);
	let formData = $state({ name: '', description: '' });

	function resetForm() {
		formData = { name: '', description: '' };
		showForm = false;
	}

	async function submitForm() {
		// TODO: Implement tag creation
		resetForm();
	}
</script>

<svelte:head>
	<title>Tags - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="h1">Tags Management</h1>
			<p class="text-surface-600">Organize your posts with tags</p>
		</div>
		<button onclick={() => (showForm = !showForm)} class="btn variant-filled-primary">
			<Icon icon="carbon:tag-add" width="18" height="18" />
			New Tag
		</button>
	</div>

	<!-- Add Tag Form -->
	{#if showForm}
		<div class="bg-white rounded-lg shadow p-6">
			<form onsubmit={submitForm} class="space-y-4">
				<div>
					<label for="name" class="block text-sm font-medium mb-2">Tag Name *</label>
					<input
						id="name"
						type="text"
						bind:value={formData.name}
						placeholder="e.g., Poetry, Tutorial"
						class="input input-bordered w-full"
						required
					/>
				</div>

				<div>
					<label for="description" class="block text-sm font-medium mb-2">Description</label>
					<textarea
						id="description"
						bind:value={formData.description}
						placeholder="Optional tag description..."
						class="textarea textarea-bordered w-full"
						rows="3"
					></textarea>
				</div>

				<div class="flex gap-2">
					<button type="submit" class="btn variant-filled-primary">Create Tag</button>
					<button type="button" onclick={resetForm} class="btn variant-ghost">Cancel</button>
				</div>
			</form>
		</div>
	{/if}

	<!-- Tags Grid -->
	{#if data.tags.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each data.tags as tag}
				<div class="bg-white rounded-lg shadow p-6">
					<div class="space-y-3">
						<h3 class="font-semibold text-lg">{tag.name}</h3>
						{#if tag.description}
							<p class="text-sm text-surface-600">{tag.description}</p>
						{/if}
						<div class="flex gap-2 pt-2">
							<button class="btn btn-sm variant-ghost flex-1">
								<Icon icon="carbon:edit" width="16" height="16" />
								Edit
							</button>
							<button class="btn btn-sm variant-filled-error flex-1">
								<Icon icon="carbon:trash-can" width="16" height="16" />
								Delete
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="bg-white rounded-lg shadow p-12 text-center">
			<Icon icon="carbon:tag" width="48" height="48" class="mx-auto opacity-30 mb-4" />
			<p class="text-surface-600">No tags yet. Create your first tag!</p>
			<button onclick={() => (showForm = true)} class="btn btn-sm variant-filled-primary mt-4">
				Create Tag
			</button>
		</div>
	{/if}
</div>
