/**
 * @deprecated Use the Heading component instead: import Heading from '$lib/components/Heading.svelte'
 * This file is kept for backward compatibility only.
 */

/**
 * Escapes HTML special characters to prevent XSS
 */
export function escapeHtml(unsafe: string | undefined | null): string {
	if (unsafe === undefined || unsafe === null) return '';

	return String(unsafe)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}