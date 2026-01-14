import type { Snippet } from 'svelte';

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  src?: string;
  alt?: string;
  href?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  text?: string;
  textSize?: LogoSize;
  class?: string;
  children?: Snippet;
}
