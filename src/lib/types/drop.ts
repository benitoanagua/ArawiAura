import type { Snippet } from 'svelte';

export interface DropOption {
	label?: string;
	value?: string;
	href?: string;
	icon?: string;
	iconComponent?: string;
	disabled?: boolean;
	divider?: boolean;
}

export interface DropProps {
	options: DropOption[];
	trigger?: Snippet;
	children?: Snippet;
	align?: 'left' | 'right';
	width?: 'auto' | 'full';
	onSelect?: (option: DropOption) => void;
	class?: string;
}