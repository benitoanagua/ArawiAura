import type { Snippet } from 'svelte';
import type { User } from '$lib/db/types';

export interface NavOption {
	label: string;
	href: string;
	icon?: string;
	iconComponent?: string;
}

export interface BottomBarProps {
	copyright?: string;
	user?: User | null;
	userMenuOptions?: NavOption[];
	guestNavOptions?: NavOption[];
	class?: string;
	children?: Snippet;
}
