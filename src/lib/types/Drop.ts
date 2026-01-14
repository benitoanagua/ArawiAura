import type { Snippet } from 'svelte';

export interface DropOption {
	label?: string;
	value?: string | number;
	icon?: string;
	iconComponent?: string;
	href?: string;
	divider?: boolean;
	disabled?: boolean;
}

export interface DropProps {
	options: DropOption[];
	trigger?: Snippet;
	children?: Snippet;
	align?: 'left' | 'center' | 'right';
	width?: string | number;
	onSelect?: (option: DropOption) => void;
	class?: string;
}
