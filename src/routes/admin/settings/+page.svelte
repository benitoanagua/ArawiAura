<script lang="ts">
	import Icon from '@iconify/svelte';

	let settings = $state({
		site_title: 'Mi Blog de Poesía',
		site_description: 'Un espacio para compartir mis poemas',
		posts_per_page: 10,
		theme_color: '#3b82f6',
		enable_comments: false,
		enable_analytics: true
	});

	let isSaving = $state(false);

	async function saveSettings() {
		isSaving = true;
		// TODO: Implement settings save
		setTimeout(() => {
			isSaving = false;
		}, 500);
	}
</script>

<svelte:head>
	<title>Settings - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div>
		<h1 class="h1">Site Settings</h1>
		<p class="text-surface-600">Configure your blog</p>
	</div>

	<!-- General Settings -->
	<div class="bg-white rounded-lg shadow p-6">
		<h3 class="font-semibold mb-4">General</h3>

		<div class="space-y-4">
			<div>
				<label for="site_title" class="block text-sm font-medium mb-2">Site Title</label>
				<input
					id="site_title"
					type="text"
					bind:value={settings.site_title}
					class="input input-bordered w-full"
				/>
			</div>

			<div>
				<label for="site_description" class="block text-sm font-medium mb-2">Site Description</label
				>
				<textarea
					id="site_description"
					bind:value={settings.site_description}
					class="textarea textarea-bordered w-full"
					rows="3"
				></textarea>
			</div>

			<div>
				<label for="posts_per_page" class="block text-sm font-medium mb-2">Posts Per Page</label>
				<input
					id="posts_per_page"
					type="number"
					bind:value={settings.posts_per_page}
					min="1"
					max="50"
					class="input input-bordered w-full"
				/>
			</div>
		</div>
	</div>

	<!-- Appearance Settings -->
	<div class="bg-white rounded-lg shadow p-6">
		<h3 class="font-semibold mb-4">Appearance</h3>

		<div class="space-y-4">
			<div>
				<label for="theme_color" class="block text-sm font-medium mb-2">Primary Color</label>
				<div class="flex gap-2">
					<input
						id="theme_color"
						type="color"
						bind:value={settings.theme_color}
						class="w-16 h-10 rounded"
					/>
					<input
						type="text"
						bind:value={settings.theme_color}
						class="input input-bordered flex-1"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Features Settings -->
	<div class="bg-white rounded-lg shadow p-6">
		<h3 class="font-semibold mb-4">Features</h3>

		<div class="space-y-3">
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					bind:checked={settings.enable_comments}
					class="checkbox checkbox-primary"
				/>
				<span class="text-sm">Enable Comments</span>
			</label>

			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					bind:checked={settings.enable_analytics}
					class="checkbox checkbox-primary"
				/>
				<span class="text-sm">Enable Analytics</span>
			</label>
		</div>
	</div>

	<!-- Save Button -->
	<div class="flex gap-2">
		<button onclick={saveSettings} disabled={isSaving} class="btn variant-filled-primary">
			{#if isSaving}
				<Icon icon="carbon:loading" width="18" height="18" class="animate-spin" />
			{:else}
				<Icon icon="carbon:checkmark" width="18" height="18" />
			{/if}
			{isSaving ? 'Saving...' : 'Save Settings'}
		</button>
	</div>
</div>
