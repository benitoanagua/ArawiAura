// Tipos para el componente Card

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
export type CardProps = {
  title: string;
  url: string;
  excerpt: string;
  feature_image?: string;
  tag_name?: string;
  tag_url?: string;
  author_name?: string;
  author_url?: string;
  author_profile_image?: string;
  media_align?: CardMediaAlign;
  media_width?: CardMediaWidth;
  heading?: CardHeading;
  density?: CardDensity;
  aspect_ratio?: CardAspectRatio;
  reading_time?: string;
  published_at?: string;
  elevation?: CardElevation;
};