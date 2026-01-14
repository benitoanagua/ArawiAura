<script lang="ts">
	
	import Icon from '@iconify/svelte';
	import Card from '$lib/components/Card.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let isEditing = $state(false);
	let formData = $derived.by(() => ({
		name: data.user?.name || '',
		email: data.user?.email || ''
	}));
	let passwordForm = $state({
		current: '',
		new: '',
		confirm: ''
	});

	async function updateProfile() {
		// TODO: Implement profile update
		isEditing = false;
	}

	async function updatePassword() {
		// TODO: Implement password update
		passwordForm = { current: '', new: '', confirm: '' };
	}
</script>

w<svelte:head>
	<title>Profile - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div>
		<h1 class="h1">Profile Settings</h1>
		<p class="text-surface-600">Manage your account information</p>
	</div>

	<!-- Profile Info -->
	<div class="bg-white rounded-lg shadow p-6">
		<div class="space-y-6">
			<div class="flex items-start gap-6">
				<div
					class="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center"
				>
					<Icon icon="carbon:user-avatar" width="48" height="48" class="text-white" />
				</div>

				<div class="flex-1">
					<h2 class="h2">{data.user?.name}</h2>
					<p class="text-surface-600">{data.user?.email}</p>
					<p class="text-xs text-surface-500 mt-2">Admin Account</p>
				</div>
			</div>

			{#if !isEditing}
				<button onclick={() => (isEditing = true)} class="btn variant-filled-primary">
					<Icon icon="carbon:edit" width="18" height="18" />
					Edit Profile
				</button>
			{/if}
		</div>
	</div>

	<!-- Edit Profile Form -->
	{#if isEditing}
		<div class="bg-white rounded-lg shadow p-6 border border-surface-300">
			<div class="space-y-4">
				<h3 class="font-semibold">Edit Profile</h3>

				<div>
					<label for="name" class="block text-sm font-medium mb-2">Name</label>
					<input
						id="name"
						type="text"
						bind:value={formData.name}
						class="input input-bordered w-full"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium mb-2">Email</label>
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						class="input input-bordered w-full"
					/>
				</div>

				<div class="flex gap-2">
					<button onclick={updateProfile} class="btn variant-filled-primary">Save Changes</button>
					<button onclick={() => (isEditing = false)} class="btn variant-ghost">Cancel</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Change Password -->
	<Card class="!p-6">
		<h3 class="font-semibold mb-4">Change Password</h3>

		<form onsubmit={updatePassword} class="space-y-4">
			<div>
				<label for="current" class="block text-sm font-medium mb-2">Current Password</label>
				<input
					id="current"
					type="password"
					bind:value={passwordForm.current}
					class="input input-bordered w-full"
					required
				/>
			</div>

			<div>
				<label for="new" class="block text-sm font-medium mb-2">New Password</label>
				<input
					id="new"
					type="password"
					bind:value={passwordForm.new}
					class="input input-bordered w-full"
					required
				/>
			</div>

			<div>
				<label for="confirm" class="block text-sm font-medium mb-2">Confirm Password</label>
				<input
					id="confirm"
					type="password"
					bind:value={passwordForm.confirm}
					class="input input-bordered w-full"
					required
				/>
			</div>

			<button type="submit" class="btn variant-filled-primary">Update Password</button>
		</form>
	</Card>
</div>
