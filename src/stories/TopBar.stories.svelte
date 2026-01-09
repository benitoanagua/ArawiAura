<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TopBar from '$lib/components/TopBar.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Components/TopBar',
		component: TopBar,
		tags: ['autodocs'],
		argTypes: {
			siteTitle: { control: 'text' },
			logoUrl: { control: 'text' },
			showLogo: { control: 'boolean' },
			showNav: { control: 'boolean' },
			sticky: { control: 'boolean' },
			currentPath: { control: 'text' }
		},
		args: {
			onclick: fn()
		}
	});
</script>

<Story
	name="Default Header"
	args={{
		siteTitle: 'Arawi Aura',
		siteDescription: 'Blog personal de tecnología',
		showLogo: true,
		showNav: true,
		sticky: false,
		currentPath: '/',
		navItems: [
			{ label: 'Home', href: '/' },
			{ label: 'About', href: '/about' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Contact', href: '/contact' }
		]
	}}
/>

<Story
	name="With Logo"
	args={{
		siteTitle: 'My Brand',
		siteDescription: 'Creative Studio',
		logoUrl: 'https://placehold.co/150x50/007bff/white?text=LOGO',
		showLogo: true,
		showNav: true,
		sticky: true,
		currentPath: '/about',
		navItems: [
			{ label: 'Home', href: '/' },
			{ label: 'Portfolio', href: '/portfolio' },
			{ label: 'Services', href: '/services' },
			{ label: 'About', href: '/about' }
		]
	}}
/>

<Story
	name="Navigation Only"
	args={{
		siteTitle: 'Navigation Demo',
		showLogo: false,
		showNav: true,
		sticky: false,
		currentPath: '/blog',
		navItems: [
			{ label: 'Articles', href: '/articles' },
			{ label: 'Tutorials', href: '/tutorials' },
			{ label: 'Resources', href: '/resources' },
			{ label: 'Archive', href: '/archive' }
		]
	}}
/>

<Story
	name="Sticky Header"
	args={{
		siteTitle: 'Sticky Navigation',
		siteDescription: 'Always visible header',
		showLogo: true,
		showNav: true,
		sticky: true,
		currentPath: '/services',
		navItems: [
			{ label: 'Home', href: '/' },
			{ label: 'Products', href: '/products' },
			{ label: 'Services', href: '/services' },
			{ label: 'Support', href: '/support' }
		]
	}}
/>

<Story
	name="Minimal Header"
	args={{
		siteTitle: 'Minimal',
		showLogo: true,
		showNav: false,
		sticky: false,
		currentPath: '/'
	}}
/>
