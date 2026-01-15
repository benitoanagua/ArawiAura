<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
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

	let showPassword = $state(false);

	$effect(() => {
		if (type !== 'password') {
			showPassword = false;
		}
	});

	const dispatch = createEventDispatcher();

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement | HTMLInputElement;
		dispatch('change', { value: target.value });
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement | HTMLInputElement;
		dispatch('input', { value: target.value });
	}

	function togglePassword() {
		showPassword = !showPassword;
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
	{:else if type === 'password'}
		<div class="ax-input__password-wrapper">
			<input
				class="ax-input"
				type={showPassword ? 'text' : 'password'}
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
			<button
				type="button"
				class="ax-input__toggle"
				aria-label={showPassword ? 'Hide password' : 'Show password'}
				onclick={togglePassword}
				{disabled}
				tabindex="-1"
			>
				{#if showPassword}
					<!-- Eye Off Icon -->
					<Icon icon="carbon:view-off" width="1.2em" height="1.2em" class="ax-input__toggle-icon" />
				{:else}
					<!-- Eye Icon -->
					<Icon icon="carbon:view" width="1.2em" height="1.2em" class="ax-input__toggle-icon" />
				{/if}
			</button>
		</div>
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
	}

	/* Hover State - Enhanced Color Ring */
	.ax-input:hover:not([disabled]) {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
		background: var(--color-surface-container-high);
	}

	/* Error State - Enhanced Red Ring */
	.ax-input-group--error .ax-input:hover:not([disabled]) {
		border-color: var(--color-error);
		box-shadow:
			0 0 0 1px var(--color-error),
			0 0 0 2px rgba(186, 26, 26, 0.2);
		background: var(--color-error-container);
	}

	/* Textarea Specific */
	.ax-input--textarea {
		resize: vertical;
		min-height: 100px;
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

	.ax-input__toggle {
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		padding: 4px;
		cursor: pointer;
		color: var(--color-on-surface-variant);
		border-radius: var(--space-1);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 200ms var(--ease-out);
		z-index: 1;
	}

	.ax-input__toggle:hover {
		color: var(--color-on-surface);
	}

	.ax-input__password-wrapper {
		position: relative;
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

	/* Responsive */
	@media (max-width: 768px) {
		.ax-input {
			padding: var(--space-3);
			font-size: var(--text-base);
		}

		.ax-input__label {
			font-size: var(--text-sm);
		}

		.ax-input__description {
			font-size: var(--text-xs);
		}

		.ax-input--textarea {
			min-height: 80px;
		}
	}
</style>
