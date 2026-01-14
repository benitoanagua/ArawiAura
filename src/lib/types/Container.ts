import type { Snippet } from 'svelte';

export type ContainerSize = 'narrow' | 'base' | 'wide' | 'full';
export type ContainerSpacing = 'compact' | 'normal' | 'loose';

export interface ContainerProps {
	size?: ContainerSize;
	spacing?: ContainerSpacing;
	children: Snippet;
	class?: string;
}
