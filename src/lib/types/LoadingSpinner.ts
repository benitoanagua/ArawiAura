import type { Snippet } from 'svelte';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
	size?: SpinnerSize;
	color?: string;
	fullscreen?: boolean;
	overlay?: boolean;
	message?: string;
	class?: string;
	children?: Snippet;
}
