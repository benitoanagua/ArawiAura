// Tipos para el componente Logo

export type LogoTextSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  src?: string;
  alt?: string;
  href?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  text?: string;
  textSize?: LogoTextSize;
}