export interface PageMetaLink {
    label: string;
    href: string;
}

export interface PageMetaProps {
    copyright?: string;
    links?: PageMetaLink[];
    showLogo?: boolean;
    class?: string;
}
