<script lang="ts">
	let { index, registerItem, children } = $props<{
		index: number;
		registerItem: (item: any) => number;
		children?: import('svelte').Snippet;
	}>();

	let itemIndex = $state<number | null>(null);

	$effect(() => {
		itemIndex = registerItem({ index });
	});
</script>

<div class="carousel-item">
	{@render children?.()}
</div>

<style>
	.carousel-item {
		flex: 0 0 100%;
		width: 100%;
		min-height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-surface);
	}
</style>
