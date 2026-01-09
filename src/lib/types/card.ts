import type { Snippet } from 'svelte';

export type CardHeading = 1 | 2 | 3 | 4 | 5 | 6;
export type CardDensity = 'normal' | 'compact' | 'minimal';
export type CardMediaAlign = 'left' | 'right' | 'top' | 'bottom';
export type CardMediaWidth =
  | 'is-one-fifth'
  | 'is-one-quarter'
  | 'is-one-third'
  | 'is-two-fifths'
  | 'is-half';
export type CardAspectRatio = 'monitor' | 'square' | 'video';
export type CardElevation = 0 | 1 | 2 | 3;

export interface CardProps {
  title: string;
  url: string;
  excerpt?: string;
  featureImage?: string;
  tagName?: string;
  tagUrl?: string;
  authorName?: string;
  authorUrl?: string;
  authorProfileImage?: string;
  mediaAlign?: CardMediaAlign;
  mediaWidth?: CardMediaWidth;
  headingLevel?: CardHeading;
  density?: CardDensity;
  aspectRatio?: CardAspectRatio;
  readingTime?: string;
  publishedAt?: string;
  elevation?: CardElevation;
  children?: Snippet;
}