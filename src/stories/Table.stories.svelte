<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Table from '$lib/components/Table.svelte';

	const { Story } = defineMeta({
		title: 'Components/Table',
		tags: ['autodocs']
	});

	// Sample data for tables
	const sampleData = [
		{ name: 'John Doe', email: 'john@example.com', role: 'Administrator', status: 'active' },
		{ name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'pending' },
		{ name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer', status: 'inactive' },
		{ name: 'Emily Davis', email: 'emily@example.com', role: 'Editor', status: 'active' },
		{ name: 'Michael Brown', email: 'michael@example.com', role: 'Administrator', status: 'pending' }
	];
</script>

<Story name="Table Variants">
	<div class="story-grid">
		<div class="story-section">
			<h2>Basic Table</h2>
			<div class="table-container">
				<Table dense={false} striped={false} hoverable={true}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>John Doe</td>
							<td>john@example.com</td>
							<td>Administrator</td>
							<td><span class="status-badge status-active">Active</span></td>
						</tr>
						<tr>
							<td>Jane Smith</td>
							<td>jane@example.com</td>
							<td>Editor</td>
							<td><span class="status-badge status-pending">Pending</span></td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>

		<section>
			<h3>Dense Table</h3>
			<div class="table-container">
				<Table dense striped hoverable>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{#each sampleData.slice(0, 3) as user}
							<tr>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>
									<span class="status-badge status-{user.status}">
										{user.status}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			</div>
		</section>

		<section>
			<h3>Striped Table</h3>
			<div class="table-container">
				<Table striped hoverable>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{#each sampleData as user, index}
							<tr>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>
									<span class="status-badge status-{user.status}">
										{user.status}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			</div>
		</section>

		<section>
			<h3>Without Hover Effects</h3>
			<div class="table-container">
				<Table dense={false} striped={false} hoverable={false}>
					<thead>
						<tr>
							<th>Task</th>
							<th>Assignee</th>
							<th>Priority</th>
							<th>Due Date</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Update documentation</td>
							<td>Alice Cooper</td>
							<td><span class="priority-high">High</span></td>
							<td>2024-02-01</td>
						</tr>
						<tr>
							<td>Fix bug reports</td>
							<td>Bob Wilson</td>
							<td><span class="priority-medium">Medium</span></td>
							<td>2024-02-05</td>
						</tr>
						<tr>
							<td>Review pull requests</td>
							<td>Carol Davis</td>
							<td><span class="priority-low">Low</span></td>
							<td>2024-02-10</td>
						</tr>
					</tbody>
				</Table>
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
		background: var(--color-background);
		min-height: 100vh;
	}

	.table-container {
		border: 1px solid var(--color-outline-variant);
		border-radius: var(--space-2);
		overflow: hidden;
		background: var(--color-surface);
	}

	.status-badge {
		padding: var(--space-1) var(--space-3);
		border-radius: var(--space-4);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
	}

	.status-active {
		background: var(--color-success-container);
		color: var(--color-on-success-container);
	}

	.status-pending {
		background: var(--color-warning-container);
		color: var(--color-on-warning-container);
	}

	.status-inactive {
		background: var(--color-surface-variant);
		color: var(--color-on-surface-variant);
	}

	.priority-high {
		color: var(--color-error);
		font-weight: 700;
	}

	.priority-medium {
		color: var(--color-warning);
		font-weight: 600;
	}

	.priority-low {
		color: var(--color-success);
		font-weight: 500;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}

	:global(.svelte-storybook table) {
		font-family: var(--font-sans);
	}

	:global(.svelte-storybook table th) {
		padding: var(--space-3) var(--space-4);
		text-align: left;
		font-weight: 600;
		color: var(--color-on-surface);
		border-bottom: 1px solid var(--color-outline);
	}

	:global(.svelte-storybook table td) {
		padding: var(--space-3) var(--space-4);
		border-bottom: 1px solid var(--color-outline-variant);
		color: var(--color-on-surface);
	}
</style>