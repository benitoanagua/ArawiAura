<script lang="ts">
	
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let uploading = $state(false);
	let uploadedFile: File | null = null;

	function formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	}

	function getFileIcon(filename: string): string {
		const ext = filename.split('.').pop()?.toLowerCase() || '';
		if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'carbon:image';
		if (['mp4', 'webm', 'mov'].includes(ext)) return 'carbon:video';
		if (['mp3', 'wav', 'ogg'].includes(ext)) return 'carbon:music';
		if (['pdf'].includes(ext)) return 'carbon:document-pdf';
		return 'carbon:document';
	}

	async function handleUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading = true;
		// TODO: Implement file upload
		uploading = false;
	}

	function copyToClipboard(url: string) {
		navigator.clipboard.writeText(url);
		// TODO: Show toast notification
	}
</script>

<svelte:head>
	<title>Media Library - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div>
		<h1 class="h1">Media Library</h1>
		<p class="text-surface-600">Manage images and files</p>
	</div>

	<!-- Upload Area -->
	<div class="bg-white rounded-lg shadow p-8 border-2 border-dashed border-surface-300 hover:border-primary-500 transition">
		<div class="text-center space-y-4">
			<Icon icon="carbon:cloud-upload" width="48" height="48" class="mx-auto opacity-50" />
			<div>
				<label for="upload" class="btn variant-filled-primary">
					<Icon icon="carbon:upload" width="18" height="18" />
					Choose File
				</label>
				<input
					id="upload"
					type="file"
					onchange={handleUpload}
					disabled={uploading}
					class="hidden"
				/>
			</div>
			<p class="text-sm text-surface-600">or drag and drop your files here</p>
		</div>
	</div>

	{#if data.assets.length > 0}
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each data.assets as asset}
				<div class="bg-white rounded-lg shadow p-4 group hover:shadow-lg transition">
					<div
						class="aspect-square bg-surface-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden group-hover:bg-surface-300"
					>
						{#if asset.url?.startsWith('data:image')}
							<img src={asset.url} alt={asset.filename} class="w-full h-full object-cover" />
						{:else}
							<Icon icon={getFileIcon(asset.filename)} width="32" height="32" class="opacity-50" />
						{/if}
					</div>

					<div class="space-y-2">
						<p class="text-sm font-medium truncate">{asset.filename}</p>
						<p class="text-xs text-surface-600">{formatFileSize(asset.size)}</p>

						<div class="flex gap-2">
							<button
								onclick={() => copyToClipboard(asset.url)}
								class="btn btn-sm variant-ghost flex-1 text-xs"
								title="Copy URL"
							>
								<Icon icon="carbon:copy" width="14" height="14" />
							</button>
							<button class="btn btn-sm variant-filled-error flex-1 text-xs" title="Delete">
								<Icon icon="carbon:trash-can" width="14" height="14" />
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="bg-white rounded-lg shadow p-12 text-center">
			<Icon icon="carbon:image" width="48" height="48" class="mx-auto opacity-30 mb-4" />
			<p class="text-surface-600">No media files yet. Upload your first file!</p>
		</div>
	{/if}
</div>
