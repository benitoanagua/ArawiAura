import type { Snippet } from 'svelte';

export interface HeadingProps {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	class?: string;
	children: Snippet;
}