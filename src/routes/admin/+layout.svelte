<script lang="ts">
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		data: any;
	}

	let { children, data }: Props = $props();

	// Navigation items as parameter
	const navItems = [
		{ label: 'Dashboard', href: '/admin', icon: 'carbon:dashboard' },
		{ label: 'Posts', href: '/admin/posts', icon: 'carbon:document', badge: '12' },
		{ label: 'Tags', href: '/admin/tags', icon: 'carbon:tag' },
		{ label: 'Media', href: '/admin/media', icon: 'carbon:image' },
		{ label: 'Profile', href: '/admin/profile', icon: 'carbon:user' },
		{ label: 'Settings', href: '/admin/settings', icon: 'carbon:settings' }
	];
</script>

<AdminLayout {navItems} title="Admin Dashboard" user={data?.user} {children}></AdminLayout>
