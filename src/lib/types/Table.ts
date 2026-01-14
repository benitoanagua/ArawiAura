import type { Snippet } from 'svelte';

export type TableDensity = 'normal' | 'dense';
export type TableVariant = 'default' | 'striped' | 'hoverable';

export interface TableProps {
  dense?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  children: Snippet;
}