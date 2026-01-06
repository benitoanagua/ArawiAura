<script lang="ts">
	export let content: string = '';
	export let id: string | undefined = undefined;

	let expanded = false;

	const toggle = () => {
		expanded = !expanded;
	};

	// Generar ID único si no se proporciona
	$: noteId = id || `sn-${Math.random().toString(36).substr(2, 9)}`;
</script>

<span class="tufte-sidenote-wrapper">
	<button type="button" class="tufte-sidenote-number" on:click={toggle} aria-label="Ver nota">
		⁺
	</button>

	<input type="checkbox" id={noteId} class="tufte-sidenote-checkbox" bind:checked={expanded} />

	<span class="tufte-sidenote" class:active={expanded}>
		<span class="tufte-sidenote-number--mobile">⁺</span>
		{@html content}
	</span>
</span>

<style>
	.tufte-sidenote-wrapper {
		position: relative;
		display: inline;
	}

	.tufte-sidenote-number {
		font-family: var(--tufte-font-sans);
		font-size: 0.75em;
		color: var(--tufte-accent);
		cursor: pointer;
		vertical-align: super;
		user-select: none;
		line-height: 0;
		background: none;
		border: none;
		padding: 0;
	}

	.tufte-sidenote-number:hover {
		color: var(--tufte-accent-hover);
	}

	.tufte-sidenote-number:focus {
		outline: 2px solid var(--tufte-accent);
		outline-offset: 2px;
	}

	.tufte-sidenote-checkbox {
		display: none;
	}

	.tufte-sidenote {
		display: none;
	}

	.tufte-sidenote-number--mobile {
		display: none;
		font-weight: 600;
		margin-right: var(--space-1);
	}

	/* Mobile: show as expandable note */
	@media screen and (max-width: 1199px) {
		.tufte-sidenote-number {
			display: none;
		}

		.tufte-sidenote-number--mobile {
			display: inline;
		}

		.tufte-sidenote {
			display: block;
			margin: var(--space-4) 0;
			padding: var(--space-4);
			background: var(--tufte-bg-warm);
			border-left: 3px solid var(--tufte-accent);
			font-family: var(--tufte-font-sans);
			font-size: var(--text-sm);
			color: var(--tufte-text-secondary);
			line-height: 1.6;
			border-radius: 0 4px 4px 0;
		}

		.tufte-sidenote-checkbox:checked + .tufte-sidenote {
			display: block;
			animation: fadeIn 0.2s ease;
		}

		.tufte-sidenote-checkbox:not(:checked) + .tufte-sidenote {
			display: none;
		}
	}

	/* Desktop: show in margin */
	@media screen and (min-width: 1200px) {
		.tufte-sidenote {
			position: absolute;
			right: calc(-1 * var(--tufte-margin-width));
			width: var(--tufte-margin-width);
			padding-left: var(--space-4);
			clear: right;
			float: right;
			margin-right: calc(-100% - var(--tufte-margin-width));
			margin-top: 0;
			margin-bottom: var(--space-4);
			font-family: var(--tufte-font-sans);
			font-size: var(--text-sm);
			color: var(--tufte-text-secondary);
			line-height: 1.5;
		}

		.tufte-sidenote-checkbox:checked + .tufte-sidenote,
		.tufte-sidenote:not(.active) {
			display: none;
		}

		.tufte-sidenote-checkbox:checked + .tufte-sidenote {
			display: block;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
