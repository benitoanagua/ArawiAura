import type { Snippet } from 'svelte';

export type PressableVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type PressableSize = 'sm' | 'md' | 'lg';

export interface PressableProps {
	variant?: PressableVariant;
	size?: PressableSize;
	disabled?: boolean;
	loading?: boolean;
	href?: string;
	type?: 'button' | 'submit' | 'reset';
	fullWidth?: boolean;
	icon?: boolean;
	onclick?: (e: Event) => void;
	class?: string;
	children?: Snippet;
}
