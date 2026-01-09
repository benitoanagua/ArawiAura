import type { CardAspectRatio, CardHeading } from './card.js';

export type OverlayAlign = 'start' | 'center' | 'end';
export type OverlayPosition = 'top' | 'center' | 'bottom';
export type OverlayBox = 'background' | 'border' | 'transparent';
export type OverlayFill = 'full' | 'none' | 'gradient';

export interface OverlayProps {
  title: string;
  url: string;
  featureImage?: string;
  tagName?: string;
  authorName?: string;
  publishedAt?: string;
  readingTime?: string;
  aspectRatio?: CardAspectRatio;
  headingLevel?: CardHeading;
  align?: OverlayAlign;
  position?: OverlayPosition;
  box?: OverlayBox;
  fill?: OverlayFill;
  showMeta?: boolean;
  compact?: boolean;
}