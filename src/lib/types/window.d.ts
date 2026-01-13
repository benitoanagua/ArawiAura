import type { ToastOptions } from '$lib/types/toast';

declare global {
	interface Window {
		toast: {
			show: (options: ToastOptions) => string;
			success: (message: string, duration?: number) => string;
			error: (message: string, duration?: number) => string;
			warning: (message: string, duration?: number) => string;
			info: (message: string, duration?: number) => string;
			clear: () => void;
		};
	}
}

export {};