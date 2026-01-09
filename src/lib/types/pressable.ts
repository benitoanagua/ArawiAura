// Tipos para el componente Pressable

export type PressableVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type PressableSize = 'sm' | 'md' | 'lg';
export type PressableType = 'button' | 'submit' | 'reset';

export interface PressableProps {
    variant?: PressableVariant;
    size?: PressableSize;
    disabled?: boolean;
    href?: string;
    type?: PressableType;
    fullWidth?: boolean;
    icon?: boolean;
    children?: any;
}
