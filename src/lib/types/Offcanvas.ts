import type { Snippet } from 'svelte';

export type OffcanvasPosition = 'left' | 'right';

export interface OffcanvasProps {
	open?: boolean;
	position?: OffcanvasPosition;
	showCloseButton?: boolean;
	onclose?: () => void;
	width?: string | number;
	class?: string;
	children?: Snippet;
}
