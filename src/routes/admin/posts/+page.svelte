<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Card from '$lib/components/Card.svelte';
	import Table from '$lib/components/Table.svelte';
	import Input from '$lib/components/Input.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let searchTerm = $state('');
	let statusFilter = $state('all');
	let tagFilter = $state('all');
	let isLoading = $state(false);

	const statusOptions = [
		{ value: 'all', label: 'All Posts' },
		{ value: 'published', label: 'Published' },
		{ value: 'draft', label: 'Drafts' }
	];

	const filteredPosts = $derived.by(() => {
		let posts = data.posts || [];
		
		// Filter by search term
		if (searchTerm) {
			posts = posts.filter(post => 
				post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		
		// Filter by status
		if (statusFilter !== 'all') {
			posts = posts.filter(post => post.status === statusFilter);
		}
		
		// Filter by tag (simplified)
		if (tagFilter !== 'all') {
			posts = posts.filter(post => 
				post.tags?.some((tag: any) => tag.id === tagFilter)
			);
		}
		
		return posts;
	});

	function handleSearch(e: Event) {
		const target = e.target as HTMLInputElement;
		searchTerm = target.value;
	}

	function handleStatusChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		statusFilter = target.value;
	}

	function handleTagChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		tagFilter = target.value;
	}

	async function deletePost(postId: string) {
		if (!confirm('Are you sure you want to delete this post?')) return;
		
		isLoading = true;
		try {
			const response = await fetch(`/api/posts/${postId}`, {
				method: 'DELETE'
			});
			
			if (response.ok) {
				// Refresh data or show success message
				location.reload();
			}
		} catch (error) {
			console.error('Error deleting post:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Manage Posts - Arawi Aura Admin</title>
</svelte:head>

<div class="ax-posts-page">
	<!-- Header -->
	<header class="ax-page-header">
		<div class="ax-page-header__content">
			<h1 class="ax-page-header__title">Posts</h1>
			<p class="ax-page-header__subtitle">Manage your blog posts</p>
		</div>
		<Pressable href="/admin/posts/new" variant="primary" size="lg">
			<Icon icon="carbon:add" width="20" height="20" />
			Create New Post
		</Pressable>
	</header>

	<!-- Filters -->
	<Card elevation={1} density="compact">
		<div class="ax-filters">
			<Input
				type="search"
				placeholder="Search posts..."
				value={searchTerm}
				on:input={handleSearch}
			>
				<Icon icon="carbon:search" width="20" height="20" />
			</Input>
			
			<select class="ax-select" bind:value={statusFilter} onchange={handleStatusChange}>
				{#each statusOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
			
			<select class="ax-select" bind:value={tagFilter} onchange={handleTagChange}>
				<option value="all">All Tags</option>
				{#each data.tags || [] as tag}
					<option value={tag.id}>{tag.name}</option>
				{/each}
			</select>
		</div>
	</Card>

	<!-- Stats -->
	<div class="ax-stats">
		<div class="ax-stat">
			<span class="ax-stat__label">Total</span>
			<span class="ax-stat__value">{data.posts?.length || 0}</span>
		</div>
		<div class="ax-stat">
			<span class="ax-stat__label">Published</span>
			<span class="ax-stat__value">
				{data.posts?.filter(p => p.status === 'published').length || 0}
			</span>
		</div>
		<div class="ax-stat">
			<span class="ax-stat__label">Drafts</span>
			<span class="ax-stat__value">
				{data.posts?.filter(p => p.status === 'draft').length || 0}
			</span>
		</div>
	</div>

	<!-- Posts Table -->
	<Card>
		{#if isLoading}
			<div class="ax-loading-container">
				<LoadingSpinner size="lg" message="Loading posts..." />
			</div>
		{:else if filteredPosts.length === 0}
			<div class="ax-empty-state">
				<div class="ax-empty-state__icon">
					<Icon icon="carbon:document-blank" width="48" height="48" />
				</div>
				<h3 class="ax-empty-state__title">No posts found</h3>
				<p class="ax-empty-state__description">
					{searchTerm || statusFilter !== 'all' || tagFilter !== 'all' 
						? 'Try adjusting your filters' 
						: 'Create your first post to get started'}
				</p>
				{#if !(searchTerm || statusFilter !== 'all' || tagFilter !== 'all')}
					<Pressable href="/admin/posts/new" variant="primary">
						<Icon icon="carbon:add" width="20" height="20" />
						Create Post
					</Pressable>
				{/if}
			</div>
		{:else}
			<Table striped hoverable>
				<thead>
					<tr>
						<th>Title</th>
						<th>Status</th>
						<th>Tags</th>
						<th>Created</th>
						<th class="ax-table__cell--center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredPosts as post}
						<tr>
							<td>
								<div class="ax-post-cell">
									{#if post.feature_image}
										<img 
											src={post.feature_image.url} 
											alt={post.title}
											class="ax-post-image"
											onerror={(e) => (e.target as HTMLImageElement).style.display = 'none'}
										/>
									{/if}
									<div class="ax-post-info">
										<strong>{post.title}</strong>
										{#if post.excerpt}
											<p class="ax-post-excerpt">{post.excerpt}</p>
										{/if}
									</div>
								</div>
							</td>
							<td>
								<span class={`ax-status-badge ax-status-badge--${post.status}`}>
									{post.status === 'published' ? 'Published' : 'Draft'}
								</span>
							</td>
							<td>
								<div class="ax-tags">
									{#each post.tags || [] as tag}
										<span class="ax-tag">{tag.name}</span>
									{/each}
								</div>
							</td>
							<td class="ax-table__cell--nowrap">
								{new Date(post.created_at).toLocaleDateString()}
							</td>
							<td class="ax-table__cell--center">
								<div class="ax-actions">
									<Pressable href={`/admin/posts/${post.id}`} variant="ghost" size="sm">
										<Icon icon="carbon:edit" width="16" height="16" />
										Edit
									</Pressable>
									<Pressable 
										variant="ghost" 
										size="sm" 
										onclick={() => deletePost(post.id)}
										disabled={isLoading}
									>
										<Icon icon="carbon:trash-can" width="16" height="16" />
										Delete
									</Pressable>
									<Pressable href={`/post/${post.slug}`} variant="ghost" size="sm">
										<Icon icon="carbon:view" width="16" height="16" />
										View
									</Pressable>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}
	</Card>
</div>

<style>
	.ax-posts-page {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Page Header */
	.ax-page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: var(--space-4);
		border-bottom: var(--line-base) solid var(--color-outline-variant);
	}

	.ax-page-header__content {
		flex: 1;
	}

	.ax-page-header__title {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 800;
		color: var(--color-on-surface);
		margin: 0 0 var(--space-2);
		letter-spacing: -0.03em;
	}

	.ax-page-header__subtitle {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	/* Filters */
	.ax-filters {
		display: flex;
		gap: var(--space-3);
		align-items: center;
		flex-wrap: wrap;
	}

	.ax-select {
		padding: var(--space-3) var(--space-4);
		border: var(--line-base) solid var(--color-outline);
		border-radius: var(--space-2);
		background: var(--color-surface-container);
		color: var(--color-on-surface);
		font-family: var(--font-sans);
		font-size: var(--text-base);
		transition: all var(--duration-fast) ease-out;
	}

	.ax-select:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 var(--space-2) var(--color-primary-container);
	}

	/* Stats */
	.ax-stats {
		display: flex;
		gap: var(--space-6);
		padding: var(--space-4);
		background: var(--color-surface-container);
		border-radius: var(--space-3);
		border: var(--line-base) solid var(--color-outline);
	}

	.ax-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-1);
	}

	.ax-stat__label {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ax-stat__value {
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-primary);
	}

	/* Post Cell */
	.ax-post-cell {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.ax-post-image {
		width: 48px;
		height: 48px;
		border-radius: var(--space-2);
		object-fit: cover;
		border: var(--line-thin) solid var(--color-outline);
		flex-shrink: 0;
	}

	.ax-post-info {
		flex: 1;
		min-width: 0;
	}

	.ax-post-info strong {
		display: block;
		font-weight: 600;
		color: var(--color-on-surface);
		margin-bottom: var(--space-1);
	}

	.ax-post-excerpt {
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Tags */
	.ax-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
	}

	.ax-tag {
		background: var(--color-surface-container-high);
		color: var(--color-on-surface-variant);
		font-size: var(--text-xs);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--space-5);
		border: var(--line-thin) solid var(--color-outline-variant);
	}

	/* Status Badges */
	.ax-status-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		border-radius: var(--space-5);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ax-status-badge--published {
		background: var(--color-success-container);
		color: var(--color-on-success-container);
	}

	.ax-status-badge--draft {
		background: var(--color-warning-container);
		color: var(--color-on-warning-container);
	}

	/* Actions */
	.ax-actions {
		display: flex;
		gap: var(--space-1);
		justify-content: center;
		flex-wrap: wrap;
	}

	/* Loading */
	.ax-loading-container {
		padding: var(--space-12);
		text-align: center;
	}

	/* Empty State */
	.ax-empty-state {
		text-align: center;
		padding: var(--space-12) var(--space-6);
	}

	.ax-empty-state__icon {
		color: var(--color-outline);
		margin-bottom: var(--space-4);
	}

	.ax-empty-state__title {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-on-surface);
		margin: 0 0 var(--space-2);
	}

	.ax-empty-state__description {
		font-family: var(--font-sans);
		font-size: var(--text-base);
		color: var(--color-on-surface-variant);
		margin: 0 0 var(--space-6);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.ax-page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-4);
		}

		.ax-filters {
			flex-direction: column;
			align-items: stretch;
		}

		.ax-stats {
			flex-direction: column;
			align-items: center;
			gap: var(--space-4);
		}

		.ax-post-cell {
			flex-direction: column;
			align-items: flex-start;
		}

		.ax-post-image {
			width: 100%;
			max-width: 200px;
			height: auto;
		}

		.ax-actions {
			justify-content: flex-start;
		}
	}
</style>