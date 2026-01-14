<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { InputProps } from '$lib/types/Input';

	let {
		type = 'text',
		value = '',
		placeholder = '',
		label = '',
		description = '',
		error = '',
		disabled = false,
		required = false,
		readonly = false,
		name = '',
		id = '',
		rows = 4,
		children
	}: InputProps = $props();

	const dispatch = createEventDispatcher();

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		dispatch('change', { value: target.value });
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		dispatch('input', { value: target.value });
	}
</script>

<div
	class="ax-input-group {error ? 'ax-input-group--error' : ''} {disabled
		? 'ax-input-group--disabled'
		: ''}"
>
	{#if label}
		<label class="ax-input__label" for={id || name}>
			{label}
			{#if required}
				<span class="ax-input__required">*</span>
			{/if}
		</label>
	{/if}

	{#if type === 'textarea'}
		<textarea
			class="ax-input ax-input--textarea"
			{id}
			{name}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			bind:value
			oninput={handleInput}
			onchange={handleChange}
			{rows}
		></textarea>
	{:else}
		<input
			class="ax-input"
			{type}
			{id}
			{name}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			bind:value
			oninput={handleInput}
			onchange={handleChange}
		/>
	{/if}

	{#if description}
		<p class="ax-input__description">{description}</p>
	{/if}

	{#if error}
		<p class="ax-input__error">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="ax-input__error-icon">
				<path
					d="M12 9v4M12 17h.01M10.363 3.591l-8.106 13.53A1 1 0 003 18.524V21a1 1 0 001 1h16a1 1 0 001-1v-2.476a1 1 0 00.707-.934l-8.107-13.53a1 1 0 00-1.706 0z"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			{error}
		</p>
	{/if}
</div>

<style>
	.ax-input-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	/* Label - Functional Typography */
	.ax-input__label {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-on-surface);
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.ax-input__required {
		color: var(--color-error);
	}

	/* Input - Structural Honesty */
	.ax-input {
		font-family: var(--font-sans);
		font-size: var(--text-base);
		color: var(--color-on-surface);
		background: var(--color-surface-container);
		border: var(--line-base) solid var(--color-outline);
		border-radius: var(--space-2);
		padding: var(--space-3) var(--space-4);
		transition: all var(--duration-fast) ease-out;
		outline: none;
		width: 100%;
		box-sizing: border-box;

		/* Anti-Reflow Focus */
		box-shadow: 0 0 0 var(--line-thin) transparent;
	}

	.ax-input:focus {
		border-color: var(--color-primary);
		box-shadow:
			0 0 0 var(--space-1) var(--color-surface),
			0 0 0 var(--space-2) var(--color-primary);
		background: var(--color-surface-container-high);
	}

	.ax-input:hover:not(:focus):not([disabled]) {
		border-color: var(--color-outline-variant);
		background: var(--color-surface-container-low);
	}

	/* Textarea Specific */
	.ax-input--textarea {
		resize: vertical;
		min-height: 100px;
	}

	/* States */
	.ax-input-group--error .ax-input {
		border-color: var(--color-error);
		background: var(--color-error-container);
		color: var(--color-on-error-container);
	}

	.ax-input-group--error .ax-input:focus {
		border-color: var(--color-error);
		box-shadow:
			0 0 0 var(--space-1) var(--color-surface),
			0 0 0 var(--space-2) var(--color-error);
	}

	.ax-input-group--disabled .ax-input {
		opacity: 0.6;
		cursor: not-allowed;
		background: var(--color-surface-container-low);
	}

	/* Description - Supporting Text */
	.ax-input__description {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		margin: 0;
		line-height: 1.4;
	}

	/* Error - Semantic Feedback */
	.ax-input__error {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		color: var(--color-error);
		margin: 0;
		display: flex;
		align-items: center;
		gap: var(--space-1);
		line-height: 1.4;
	}

	.ax-input__error-icon {
		flex-shrink: 0;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.ax-input {
			padding: var(--space-3);
			font-size: var(--text-base);
		}

		.ax-input__label {
			font-size: var(--text-sm);
		}
	}
</style>
