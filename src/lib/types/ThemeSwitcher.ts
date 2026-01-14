import type { Snippet } from 'svelte';

export type Theme = 'auto' | 'light' | 'dark';

export interface ThemeSwitcherProps {
	theme?: Theme;
	showLabel?: boolean;
	class?: string;
	children?: Snippet;
}
