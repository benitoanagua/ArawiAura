// Tipos para el componente Carousel

export interface CarouselItemProps {
  index: number;
  registerItem?: (item: any) => number | undefined;
}

export interface CarouselProps {
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  children?: any;
}