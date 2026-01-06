/**
 * Utilidades para procesar Markdown
 */

/**
 * Convierte Markdown a HTML (implementación básica)
 * TODO: Integrar con una librería como marked o remark
 */
export function markdownToHtml(markdown: string): string {
	// Por ahora, una implementación muy básica
	// En producción, usar marked, remark, o similar
	return markdown
		.replace(/^# (.*$)/gim, '<h1>$1</h1>')
		.replace(/^## (.*$)/gim, '<h2>$1</h2>')
		.replace(/^### (.*$)/gim, '<h3>$1</h3>')
		.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
		.replace(/\*(.*)\*/gim, '<em>$1</em>')
		.replace(/\n/gim, '<br>');
}

/**
 * Genera un excerpt del contenido
 */
export function generateExcerpt(content: string, maxLength = 160): string {
	// Remover markdown básico
	const plainText = content
		.replace(/#{1,6}\s+/g, '')
		.replace(/\*\*(.*?)\*\*/g, '$1')
		.replace(/\*(.*?)\*/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/\n/g, ' ')
		.trim();
	
	if (plainText.length <= maxLength) {
		return plainText;
	}
	
	return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Calcula el tiempo de lectura estimado
 */
export function calculateReadingTime(content: string): number {
	if (!content || typeof content !== 'string') {
		return 0;
	}
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes;
}

/**
 * Cuenta las palabras en el contenido
 */
export function countWords(content: string): number {
	if (!content || typeof content !== 'string') {
		return 0;
	}
	return content.trim().split(/\s+/).length;
}

/**
 * Genera un slug a partir de un título
 */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}