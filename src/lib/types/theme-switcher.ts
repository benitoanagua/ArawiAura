import type { Snippet } from 'svelte';

export type Theme = 'light' | 'dark';

export interface ThemeSwitcherProps {
    theme?: Theme;
    showLabel?: boolean;
    class?: string;
    children?: Snippet; // Optional content to wrap or use as trigger
}
