import type { Snippet } from 'svelte';

export interface NavItem {
	label: string;
	href: string;
	icon?: string;
}

export interface TopBarProps {
	siteTitle?: string;
	logoUrl?: string;
	navItems?: NavItem[];
	showLogo?: boolean;
	showNav?: boolean;
	sticky?: boolean;
	currentPath?: string;
	class?: string;
	children?: Snippet;
}
