import type { Snippet } from 'svelte';

export interface HeroProps {
	title?: string;
	subtitle?: string;
	backgroundImage?: string;
	height?: string;
	children?: Snippet;
	class?: string;
}
