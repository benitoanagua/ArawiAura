import type { Snippet } from 'svelte';

export type InputType =
	| 'text'
	| 'email'
	| 'password'
	| 'number'
	| 'date'
	| 'search'
	| 'tel'
	| 'url'
	| 'textarea';

export interface InputProps {
	name?: string;
	id?: string;
	type?: InputType;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	required?: boolean;
	readonly?: boolean;
	label?: string;
	description?: string;
	error?: string;
	rows?: number;
	showPassword?: boolean;
	onchange?: (value: string) => void;
	class?: string;
	children?: Snippet;
}
