export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastNotification {
	id: string;
	message: string;
	type?: ToastType;
	duration?: number;
}

export interface ToastOptions {
	id?: string;
	message: string;
	type?: ToastType;
	duration?: number;
}
