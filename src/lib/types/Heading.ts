import type { Snippet } from 'svelte';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps {
  level: HeadingLevel;
  class?: string;
  children: Snippet;
}