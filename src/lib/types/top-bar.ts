export interface TopBarNavItem {
    label: string;
    href: string;
}

export interface TopBarProps {
    siteTitle?: string;
    logoUrl?: string;
    navItems?: TopBarNavItem[];
    showLogo?: boolean;
    showNav?: boolean;
    sticky?: boolean;
    currentPath?: string;
    class?: string;
}
