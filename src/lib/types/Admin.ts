import type { Snippet } from 'svelte';

export interface NavItem {
	label: string;
	href: string;
	icon: string;
	badge?: string | number;
}

export interface AdminLayoutProps {
	navItems?: NavItem[];
	title?: string;
	brand?: Snippet;
	actions?: Snippet;
	user?: {
		name?: string;
		email?: string;
		role?: string;
	};
	children: Snippet;
	activeHref?: string;
}
