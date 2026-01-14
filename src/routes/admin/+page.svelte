<script lang="ts">
	import Icon from '@iconify/svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Card from '$lib/components/Card.svelte';
	import Table from '$lib/components/Table.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const metrics = $derived.by(() => [
		{
			label: 'Total Posts',
			value: data.metrics.totalPosts,
			icon: 'carbon:document',
			status: 'primary'
		},
		{
			label: 'Published',
			value: data.metrics.publishedPosts,
			icon: 'carbon:publish',
			status: 'success'
		},
		{
			label: 'Drafts',
			value: data.metrics.draftPosts,
			icon: 'carbon:draft',
			status: 'warning'
		},
		{
			label: 'Total Images',
			value: data.metrics.totalAssets,
			icon: 'carbon:image',
			status: 'info'
		},
		{
			label: 'Tags',
			value: data.metrics.totalTags,
			icon: 'carbon:tag',
			status: 'accent'
		}
	]);

	function getStatusClass(status: string) {
		switch (status) {
			case 'success':
				return 'ax-metric--success';
			case 'warning':
				return 'ax-metric--warning';
			case 'info':
				return 'ax-metric--info';
			case 'accent':
				return 'ax-metric--accent';
			default:
				return 'ax-metric--primary';
		}
	}
</script>

<svelte:head>
	<title>Admin Dashboard - Arawi Aura</title>
</svelte:head>

<div class="ax-dashboard">
	<!-- Page Header - Monumental Typography -->
	<header class="ax-dashboard__header">
		<div class="ax-dashboard__header-content">
			<h1 class="ax-dashboard__title">Dashboard</h1>
			<p class="ax-dashboard__subtitle">Welcome back! Here's an overview of your blog.</p>
		</div>
		<Pressable href="/admin/posts/new" variant="primary" size="lg">
			<Icon icon="carbon:add" width="20" height="20" />
			Create New Post
		</Pressable>
	</header>

	<!-- Metrics Grid - Blueprint Grid System -->
	<section class="ax-section">
		<h2 class="ax-section__title">Metrics Overview</h2>
		<div class="ax-metrics-grid">
			{#each metrics as metric}
				<div class={`ax-metric ${getStatusClass(metric.status)}`}>
					<div class="ax-metric__content">
						<div class="ax-metric__info">
							<p class="ax-metric__label">{metric.label}</p>
							<p class="ax-metric__value">{metric.value}</p>
						</div>
						<div class="ax-metric__icon">
							<Icon icon={metric.icon} width="32" height="32" />
						</div>
					</div>
					<div class="ax-metric__footer">
						<div class="ax-metric__progress"></div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Recent Posts Section - Editorial Structure -->
	<section class="ax-section">
		<div class="ax-section__header">
			<h2 class="ax-section__title">Recent Posts</h2>
			<Pressable href="/admin/posts" variant="outline" size="sm">
				<Icon icon="carbon:arrow-right" width="16" height="16" />
			</Pressable>
		</div>

		{#if data.recentPosts.length > 0}
			<div class="ax-table-container">
				<table class="ax-table">
					<thead class="ax-table__head">
						<tr>
							<th class="ax-table__header">Title</th>
							<th class="ax-table__header">Status</th>
							<th class="ax-table__header">Created</th>
							<th class="ax-table__header ax-table__header--center">Actions</th>
						</tr>
					</thead>
					<tbody class="ax-table__body">
						{#each data.recentPosts as post}
							<tr class="ax-table__row">
								<td class="ax-table__cell">
									<div class="ax-post-title">
										{post.title}
										{#if post.feature_image}
											<div class="ax-post-image-preview">
												<img src={post.feature_image.url} alt="" />
											</div>
										{/if}
									</div>
								</td>
								<td class="ax-table__cell">
									<span
										class={`ax-status-badge ax-status-badge--${post.status === 'published' ? 'success' : 'warning'}`}
									>
										{post.status === 'published' ? 'Published' : 'Draft'}
									</span>
								</td>
								<td class="ax-table__cell ax-table__cell--date">
									{new Date(post.created_at).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})}
								</td>
								<td class="ax-table__cell ax-table__cell--center">
									<div class="ax-actions">
										<Pressable href="/admin/posts/{post.id}" variant="ghost" size="sm">
											<Icon icon="carbon:edit" width="16" height="16" />
											Edit
										</Pressable>
										<Pressable
											variant="ghost"
											size="sm"
											onclick={() => {
												console.log('Delete post:', post.id);
											}}
										>
											<Icon icon="carbon:trash-can" width="16" height="16" />
											Delete
										</Pressable>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="ax-empty-state">
				<div class="ax-empty-state__icon">
					<Icon icon="carbon:document-blank" width="48" height="48" />
				</div>
				<h3 class="ax-empty-state__title">No posts yet</h3>
				<p class="ax-empty-state__description">Create your first post to get started!</p>
				<Pressable href="/admin/posts/new" variant="primary">
					<Icon icon="carbon:add" width="20" height="20" />
					Create Post
				</Pressable>
			</div>
		{/if}
	</section>

	<!-- Quick Actions - Modular Cards -->
	<section class="ax-section">
		<h2 class="ax-section__title">Quick Actions</h2>
		<div class="ax-actions-grid">
			<a href="/admin/posts" class="ax-action-card">
				<div class="ax-action-card__icon ax-action-card__icon--primary">
					<Icon icon="carbon:document-add" width="24" height="24" />
				</div>
				<div class="ax-action-card__content">
					<h3 class="ax-action-card__title">Create Post</h3>
					<p class="ax-action-card__description">Start writing a new article</p>
				</div>
				<Icon icon="carbon:arrow-right" width="20" height="20" class="ax-action-card__arrow" />
			</a>

			<a href="/admin/media" class="ax-action-card">
				<div class="ax-action-card__icon ax-action-card__icon--secondary">
					<Icon icon="carbon:image-add" width="24" height="24" />
				</div>
				<div class="ax-action-card__content">
					<h3 class="ax-action-card__title">Upload Media</h3>
					<p class="ax-action-card__description">Add images and files</p>
				</div>
				<Icon icon="carbon:arrow-right" width="20" height="20" class="ax-action-card__arrow" />
			</a>

			<a href="/admin/tags" class="ax-action-card">
				<div class="ax-action-card__icon ax-action-card__icon--accent">
					<Icon icon="carbon:tag-edit" width="24" height="24" />
				</div>
				<div class="ax-action-card__content">
					<h3 class="ax-action-card__title">Manage Tags</h3>
					<p class="ax-action-card__description">Organize content categories</p>
				</div>
				<Icon icon="carbon:arrow-right" width="20" height="20" class="ax-action-card__arrow" />
			</a>
		</div>
	</section>
</div>

<style>
	/* Architectural Outline Dashboard */
	.ax-dashboard {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Header - Monumental Typography */
	.ax-dashboard__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: var(--space-6);
		border-bottom: var(--line-base) solid var(--color-outline-variant);
	}

	.ax-dashboard__header-content {
		flex: 1;
	}

	.ax-dashboard__title {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 800;
		color: var(--color-on-surface);
		margin: 0 0 var(--space-2);
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	.ax-dashboard__subtitle {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	/* Sections - Editorial Structure */
	.ax-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.ax-section__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.ax-section__title {
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-on-surface);
		margin: 0;
	}

	/* Metrics Grid - Blueprint Grid System */
	.ax-metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--space-4);
	}

	.ax-metric {
		background: var(--color-surface-container);
		border-radius: var(--space-3);
		border: var(--line-base) solid var(--color-outline);
		transition: all var(--duration-base) ease-out;
		overflow: hidden;
		position: relative;
	}

	.ax-metric:hover {
		transform: translateY(-2px);
		border-color: var(--color-primary);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.ax-metric__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-5);
	}

	.ax-metric__info {
		flex: 1;
	}

	.ax-metric__label {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-on-surface-variant);
		margin: 0 0 var(--space-1);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ax-metric__value {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 800;
		color: var(--color-primary);
		margin: 0;
		line-height: 1;
	}

	.ax-metric__icon {
		color: var(--color-outline);
		opacity: 0.6;
	}

	.ax-metric__footer {
		padding: 0 var(--space-5) var(--space-3);
	}

	.ax-metric__progress {
		height: var(--space-1);
		background: var(--color-outline-variant);
		border-radius: var(--space-1);
		overflow: hidden;
	}

	/* Status Variants */
	.ax-metric--primary .ax-metric__value {
		color: var(--color-primary);
	}
	.ax-metric--success .ax-metric__value {
		color: var(--color-success);
	}
	.ax-metric--warning .ax-metric__value {
		color: var(--color-warning);
	}
	.ax-metric--info .ax-metric__value {
		color: var(--color-info);
	}
	.ax-metric--accent .ax-metric__value {
		color: var(--color-accent);
	}

	/* Table - Structural Honesty */
	.ax-table-container {
		background: var(--color-surface-container);
		border-radius: var(--space-3);
		border: var(--line-base) solid var(--color-outline);
		overflow: hidden;
	}

	.ax-table {
		width: 100%;
		border-collapse: collapse;
	}

	.ax-table__head {
		background: var(--color-surface-container-high);
	}

	.ax-table__header {
		text-align: left;
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-on-surface);
		padding: var(--space-4) var(--space-5);
		border-bottom: var(--line-base) solid var(--color-outline);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ax-table__header--center {
		text-align: center;
	}

	.ax-table__body .ax-table__row:last-child .ax-table__cell {
		border-bottom: none;
	}

	.ax-table__cell {
		padding: var(--space-4) var(--space-5);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
		font-family: var(--font-sans);
		font-size: var(--text-base);
		color: var(--color-on-surface);
	}

	.ax-table__cell--center {
		text-align: center;
	}

	.ax-table__cell--date {
		color: var(--color-on-surface-variant);
		font-size: var(--text-sm);
	}

	.ax-post-title {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.ax-post-image-preview {
		width: 40px;
		height: 40px;
		border-radius: var(--space-1);
		overflow: hidden;
		border: var(--line-thin) solid var(--color-outline);
		flex-shrink: 0;
	}

	.ax-post-image-preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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

	.ax-status-badge--success {
		background: var(--color-success-container);
		color: var(--color-on-success-container);
	}

	.ax-status-badge--warning {
		background: var(--color-warning-container);
		color: var(--color-on-warning-container);
	}

	/* Actions */
	.ax-actions {
		display: flex;
		gap: var(--space-2);
		justify-content: center;
	}

	/* Empty State */
	.ax-empty-state {
		text-align: center;
		padding: var(--space-12) var(--space-6);
		background: var(--color-surface-container);
		border-radius: var(--space-3);
		border: var(--line-base) dashed var(--color-outline-variant);
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

	/* Action Cards - Modular Design */
	.ax-actions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-4);
	}

	.ax-action-card {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--color-surface-container);
		border-radius: var(--space-3);
		border: var(--line-base) solid var(--color-outline);
		text-decoration: none;
		transition: all var(--duration-base) ease-out;
		position: relative;
		overflow: hidden;
	}

	.ax-action-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-primary);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		background: var(--color-surface-container-high);
	}

	.ax-action-card__icon {
		width: 48px;
		height: 48px;
		border-radius: var(--space-2);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.ax-action-card__icon--primary {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
	}

	.ax-action-card__icon--secondary {
		background: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
	}

	.ax-action-card__icon--accent {
		background: var(--color-accent-container);
		color: var(--color-on-accent-container);
	}

	.ax-action-card__content {
		flex: 1;
	}

	.ax-action-card__title {
		font-family: var(--font-sans);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-on-surface);
		margin: 0 0 var(--space-1);
	}

	.ax-action-card__description {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	.ax-action-card__arrow {
		color: var(--color-outline);
		transition: transform var(--duration-fast) ease-out, color var(--duration-fast) ease-out;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.ax-dashboard__header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-4);
		}

		.ax-section__header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-3);
		}

		.ax-metrics-grid {
			grid-template-columns: 1fr;
		}

		.ax-actions-grid {
			grid-template-columns: 1fr;
		}

		.ax-table-container {
			overflow-x: auto;
		}

		.ax-table {
			min-width: 600px;
		}
	}
</style>
