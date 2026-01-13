export interface PageMetaLink {
    label: string;
    href: string;
}

import type { User } from '$lib/db/types';
import type { DropOption } from '$lib/types/drop.js';

export interface PageMetaProps {
    copyright?: string;
    user?: User | null;
    userMenuOptions?: DropOption[];
    guestNavOptions?: DropOption[];
    siteTitle?: string;
    showLogo?: boolean;
    currentPath?: string;
    class?: string;
}
