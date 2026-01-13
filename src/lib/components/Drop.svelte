<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { DropOption, DropProps } from '$lib/types/drop.js';

	const dispatch = createEventDispatcher();

	let {
		options,
		trigger,
		children,
		align = 'right',
		width = 'auto',
		onSelect,
		class: className
	}: DropProps = $props();

	// Use trigger if provided, otherwise fallback to children
	const renderTrigger = () => {
		try {
			return trigger?.() || (children ? children() : null);
		} catch (error) {
			console.warn('Drop component: Error rendering trigger', error);
			return null;
		}
	};

	let isOpen = $state(false);
	let dropElement = $state<HTMLElement>();
	let triggerElement = $state<HTMLElement>();

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	function handleOptionClick(option: DropOption) {
		if (option.disabled || option.divider) return;
		
		if (onSelect) {
			onSelect(option);
		}
		
		if (option.href) {
			window.location.href = option.href;
		}
		
		dispatch('select', option);
		closeDropdown();
	}

	function handleClickOutside(event: MouseEvent) {
		if (
			dropElement &&
			!dropElement.contains(event.target as Node) &&
			triggerElement &&
			!triggerElement.contains(event.target as Node)
		) {
			closeDropdown();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<!-- Architectural Blueprint Structure -->
<!-- The skeleton becomes visible - honest engineering -->
<div class="ax-drop {className || ''}" data-open="{isOpen}" bind:this={dropElement}>
	<!-- Blueprint grid foundation -->
	<div class="ax-drop__structure">
		{#if renderTrigger()}
			<!-- Custom trigger - maintains structural integrity -->
			<div 
				class="ax-drop__trigger ax-drop__trigger--custom" 
				onclick={toggleDropdown}
				bind:this={triggerElement}
				role="button"
				tabindex="0"
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						toggleDropdown();
					}
				}}
			>
				{@render renderTrigger()}
			</div>
		{:else}
			<!-- Standard trigger - industrial switch precision -->
			<button 
				class="ax-drop__trigger ax-drop__trigger--standard" 
				onclick={toggleDropdown}
				bind:this={triggerElement}
			>
				<span class="ax-drop__trigger-label">Menu</span>
				<span class="ax-drop__trigger-icon">
					<Icon icon="carbon:chevron-down" width="1.1em" height="1.1em" />
				</span>
			</button>
		{/if}
	</div>

	<!-- Dropdown expansion - geometric revelation -->
	{#if isOpen}
		<div 
			class="ax-drop__panel ax-drop__panel--{align} ax-drop__panel--width-{width}"
			role="menu"
			aria-orientation="vertical"
		>
			<!-- Blueprint grid content -->
			<div class="ax-drop__panel-content">
				{#each options as option, index}
					{#if option.divider}
						<!-- Structural division - grid line -->
						<div class="ax-drop__divider" role="separator"></div>
					{:else}
						<!-- Menu item - technical specification -->
						<button
							class="ax-drop__option {option.disabled ? 'ax-drop__option--disabled' : ''}"
							role="menuitem"
							onclick={() => handleOptionClick(option)}
							disabled={option.disabled}
						>
							{#if option.iconComponent}
								<span class="ax-drop__option-icon" aria-hidden="true">
									<Icon icon={option.iconComponent} width="1.2em" height="1.2em" />
								</span>
							{:else if option.icon}
								<span class="ax-drop__option-icon" aria-hidden="true">{option.icon}</span>
							{/if}
							<span class="ax-drop__option-label">{option.label}</span>
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	/* Architectural Outline Philosophy */
	/* The skeleton becomes the skin - structure as narrative */
	
	.ax-drop {
		position: relative;
		display: inline-block;
		/* Blueprint foundation - visible architecture */
	}

	.ax-drop__structure {
		/* Grid framework revelation */
		position: relative;
	}

	.ax-drop__trigger {
		cursor: pointer;
		user-select: none;
		/* Industrial switch precision */
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		border: none;
		background: transparent;
		outline: none;
		/* Ring-based architecture - no layout shift */
		--ring-color-default: transparent;
		box-shadow: 0 0 0 var(--line-thin) var(--ring-color-default);
		box-sizing: border-box;
		position: relative;
	}

	.ax-drop__trigger:focus-visible {
		/* Ring theory implementation - anti-reflow */
		outline: none;
		box-shadow:
			0 0 0 var(--ring-offset) var(--color-surface),
			0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color),
			0 0 0 var(--line-thin) var(--ring-color-default);
		z-index: 10;
	}

	.ax-drop__trigger--standard {
		/* Structural honesty - industrial switch */
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		border-radius: clamp(2px, 0.5vw, 6px);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 500;
		/* Ring system prevents layout shift */
		--ring-color-default: var(--color-outline-variant);
	}

	.ax-drop__trigger--standard:hover:not(:focus) {
		/* Ring expansion - no border width change */
		--ring-color-default: var(--color-outline);
		background: var(--color-surface-container-low);
	}

	.ax-drop__trigger--standard:focus {
		/* Ring illumination without displacement */
		outline: none;
		--ring-color-default: var(--color-primary);
		background: var(--color-surface-container-low);
	}

	/* .ax-drop__trigger-label - Technical specification labeling */

	.ax-drop__trigger-icon {
		/* Structural indicator - geometric precision */
		display: flex;
		align-items: center;
		transition: transform var(--duration-base) ease-out;
	}

	.ax-drop__panel {
		position: absolute;
		bottom: 100%;
		margin-bottom: var(--space-1);
		min-width: 200px;
		background: var(--color-surface-container-lowest);
		/* Blueprint grid - ring-based borders */
		border: none;
		border-radius: clamp(4px, 1vw, 8px);
		--ring-color-default: var(--color-outline);
		box-shadow: 0 0 0 var(--line-thin) var(--ring-color-default);
		/* No shadows - structure speaks */
		z-index: 100;
		/* Geometric expansion animation */
		transform-origin: bottom center;
		animation: expandFromBottom var(--duration-base) cubic-bezier(0.25, 0.1, 0.25, 1);
		box-sizing: border-box;
	}

	.ax-drop__panel--left {
		left: 0;
		/* Grid alignment - precise positioning */
	}

	.ax-drop__panel--right {
		right: 0;
		/* Structural balance */
	}

	.ax-drop__panel--width-full {
		width: 100%;
		min-width: unset;
		/* Aspect ratio enforcement */
	}

	.ax-drop__panel--width-auto {
		width: auto;
		/* Content-driven dimensions */
	}

	.ax-drop__panel-content {
		/* Blueprint grid container */
		padding: var(--space-1);
	}

	@keyframes expandFromBottom {
		0% {
			opacity: 0;
			transform: scaleY(0.8) translateY(4px);
		}
		100% {
			opacity: 1;
			transform: scaleY(1) translateY(0);
		}
	}

	.ax-drop__option {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		background: transparent;
		/* Blueprint honesty - ring-based architecture */
		border: none;
		outline: none;
		text-align: left;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-on-surface);
		cursor: pointer;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		gap: var(--space-2);
		/* Technical specification aesthetic */
		--ring-color-default: transparent;
		box-shadow: inset 0 0 0 var(--line-thin) var(--ring-color-default);
		box-sizing: border-box;
	}

	.ax-drop__option:hover:not(.ax-drop__option--disabled) {
		/* Ring emphasis - no layout shift */
		--ring-color-default: var(--color-outline);
		background: var(--color-surface-container-highest);
	}

	.ax-drop__option:focus {
		outline: none;
		/* Ring theory - anti-reflow focus */
		box-shadow:
			inset 0 0 0 var(--ring-offset) var(--color-surface),
			inset 0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color),
			inset 0 0 0 var(--line-thin) var(--ring-color-default);
	}

	.ax-drop__option--disabled {
		/* Structural degradation - ring opacity reduction */
		opacity: 0.4;
		cursor: not-allowed;
		--ring-color-default: var(--color-outline-variant);
		box-shadow: inset 0 0 0 var(--line-thin) var(--ring-color-default);
	}

	.ax-drop__option-icon {
		font-size: var(--text-base);
		width: 1.25em;
		text-align: center;
		/* Technical symbol precision */
		flex-shrink: 0;
	}

	.ax-drop__option-label {
		flex: 1;
		/* Structural content hierarchy */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ax-drop__divider {
		margin: var(--space-1) calc(var(--space-1) * -1);
		/* Shared border principle - continuous grid */
		height: var(--line-thin);
		background: linear-gradient(90deg, 
			transparent 0%, 
			var(--color-outline-variant) 15%, 
			var(--color-outline-variant) 85%, 
			transparent 100%);
		/* Blueprint grid continuity */
	}

	/* Mobile-first geometric adaptation */
	@media (max-width: 640px) {
		.ax-drop__panel {
			min-width: 180px;
			margin-bottom: var(--space-1);
			/* Intelligent border radius scaling */
			border-radius: clamp(2px, 1vw, 6px);
		}

		.ax-drop__option {
			padding: var(--space-2) var(--space-3);
			font-size: var(--text-xs);
			/* Compact technical report format */
		}
	}

	@media (max-width: 480px) {
		.ax-drop__panel {
			min-width: 160px;
			/* Sharp precision for small screens */
			border-radius: 2px;
		}

		.ax-drop__option {
			padding: var(--space-1-5) var(--space-2);
			/* Dense information architecture */
		}
	}

	/* Industrial switch micro-physics */
	.ax-drop__trigger--standard:active,
	.ax-drop__option:active:not(.ax-drop__option--disabled) {
		/* Mechanical resistance simulation */
		transform: scale(0.98);
		transition: transform var(--duration-fastest) cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Structural transformation - panel state indicator */
	.ax-drop[data-open="true"] .ax-drop__trigger-icon {
		transform: rotate(180deg);
	}

	/* Ring elevation system */
	.ax-drop__panel {
		/* E-2 level - surface elevation */
		--ring-color-default: var(--color-outline);
	}

	.ax-drop__panel:focus-within {
		/* E-3 level - high authority */
		--ring-color-default: var(--color-primary);
	}

	/* Continuous line grid - shared borders principle */
	.ax-drop__panel-content {
		/* Blueprint grid container */
		padding: var(--space-1);
	}

	/* Grid intersection reinforcement */
	.ax-drop__panel::after {
		content: '';
		position: absolute;
		top: -1px;
		left: -1px;
		right: -1px;
		bottom: -1px;
		/* CAD-style intersection */
		background: radial-gradient(circle at 315deg, 
			var(--color-outline-variant) 0%, 
			transparent 70%);
		pointer-events: none;
		opacity: 0.15;
	}
</style>