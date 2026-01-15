<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AdminLayout from '$lib/components/AdminLayout.svelte';

	const { Story } = defineMeta({
		title: 'Components/Admin',
		tags: ['autodocs']
	});
</script>

<Story name="AdminLayout - Mobile First">
	<div
		style="height: 600px; border: 1px solid var(--color-outline); border-radius: 8px; overflow: hidden;"
	>
		<AdminLayout
			navItems={[
				{ label: 'Dashboard', href: '/admin', icon: 'carbon:dashboard' },
				{ label: 'Posts', href: '/admin/posts', icon: 'carbon:document', badge: '12' },
				{ label: 'Tags', href: '/admin/tags', icon: 'carbon:tag' },
				{ label: 'Media', href: '/admin/media', icon: 'carbon:image', badge: '24' },
				{ label: 'Profile', href: '/admin/profile', icon: 'carbon:user' },
				{ label: 'Settings', href: '/admin/settings', icon: 'carbon:settings' }
			]}
			title="Admin Dashboard"
			user={{ name: 'John Doe', email: 'john@example.com', role: 'admin' }}
			activeHref="/admin/posts"
		>
			{#snippet children()}
				<div style="padding: 24px; font-family: var(--font-sans);">
					<h2 style="margin: 0 0 16px 0; font-family: var(--font-display);">Blueprint Dashboard</h2>
					<p style="margin: 0 0 24px 0; color: var(--color-on-surface-variant);">
						Architectural Outline mobile-first design system.
					</p>

					<div
						style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;"
					>
						<div
							style="padding: 20px; background: var(--color-surface-container); border: 1px solid var(--color-outline); border-radius: var(--space-2);"
						>
							<h3
								style="margin: 0 0 8px 0; font-family: var(--font-display); color: var(--color-primary);"
							>
								Total Posts
							</h3>
							<p
								style="margin: 0; font-size: 24px; font-weight: bold; font-family: var(--font-display);"
							>
								42
							</p>
						</div>
						<div
							style="padding: 20px; background: var(--color-surface-container); border: 1px solid var(--color-outline); border-radius: var(--space-2);"
						>
							<h3
								style="margin: 0 0 8px 0; font-family: var(--font-display); color: var(--color-success);"
							>
								Published
							</h3>
							<p
								style="margin: 0; font-size: 24px; font-weight: bold; font-family: var(--font-display);"
							>
								38
							</p>
						</div>
					</div>
				</div>
			{/snippet}
		</AdminLayout>
	</div>
</Story>

<Story name="AdminLayout - Minimal">
	<div
		style="height: 400px; border: 1px solid var(--color-outline); border-radius: 8px; overflow: hidden;"
	>
		<AdminLayout
			navItems={[
				{ label: 'Overview', href: '/admin', icon: 'carbon:dashboard' },
				{ label: 'Users', href: '/admin/users', icon: 'carbon:user-multiple' }
			]}
			title="Simple Admin"
		>
			{#snippet children()}
				<div style="padding: 24px; font-family: var(--font-sans);">
					<h2>Minimal Interface</h2>
					<p>Structural honesty with essential navigation only.</p>
				</div>
			{/snippet}
		</AdminLayout>
	</div>
</Story>

<Story name="AdminLayout - Active States">
	<div
		style="height: 600px; border: 1px solid var(--color-outline); border-radius: 8px; overflow: hidden;"
	>
		<AdminLayout
			navItems={[
				{ label: 'Dashboard', href: '/admin', icon: 'carbon:dashboard' },
				{ label: 'Posts', href: '/admin/posts', icon: 'carbon:document', badge: '12' },
				{ label: 'Tags', href: '/admin/tags', icon: 'carbon:tag' },
				{ label: 'Media', href: '/admin/media', icon: 'carbon:image', badge: '24' },
				{ label: 'Profile', href: '/admin/profile', icon: 'carbon:user' },
				{ label: 'Settings', href: '/admin/settings', icon: 'carbon:settings' }
			]}
			title="Admin Dashboard"
			user={{ name: 'John Doe', email: 'john@example.com', role: 'admin' }}
			activeHref="/admin"
		>
			{#snippet children()}
				<div style="padding: 24px; font-family: var(--font-sans);">
					<h2 style="margin: 0 0 16px 0; font-family: var(--font-display);">Dashboard Active</h2>
					<p style="margin: 0 0 24px 0; color: var(--color-on-surface-variant);">
						Demonstrating active navigation state with Dashboard selected.
					</p>

					<div
						style="padding: 20px; background: var(--color-primary-container); border-radius: var(--space-2); color: var(--color-on-primary-container);"
					>
						<p style="margin: 0; font-weight: 600;">✓ Active state styling is working correctly</p>
					</div>
				</div>
			{/snippet}
		</AdminLayout>
	</div>
</Story>

<style>
	:global(body) {
		margin: 0;
		font-family: var(--font-sans);
	}

	/* Architectural Outline CSS Variables */
	:root {
		--color-primary: #000000;
		--color-on-primary: #ffffff;
		--color-success: #00674b;
		--color-surface: #f9f9f9;
		--color-surface-container: #eeeeee;
		--color-surface-container-high: #e8e8e8;
		--color-surface-container-low: #f3f3f3;
		--color-outline: #777777;
		--color-outline-variant: #c6c6c6;
		--color-on-surface: #1b1b1b;
		--color-on-surface-variant: #474747;
		--space-1: 4px;
		--space-2: 8px;
		--space-3: 12px;
		--space-4: 16px;
		--line-base: 1px;
		--line-thin: 1px;
		--font-sans: system-ui, -apple-system, sans-serif;
		--font-display: Georgia, serif;
		--text-base: 16px;
		--text-sm: 14px;
		--duration-fast: 150ms;
		--duration-base: 300ms;
	}
</style>
