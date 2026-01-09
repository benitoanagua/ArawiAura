<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from '$lib/components/Tabs.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import TabPanel from '$lib/components/TabPanel.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import * as falso from '@ngneat/falso';

	const { Story } = defineMeta({
		title: 'Components/Tabs',
		component: Tabs,
		tags: ['autodocs']
	});

	const labels = ['Overview', 'Details', 'Performance', 'Logs'];
	const mockContent = labels.map(() => falso.randParagraph());
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Line Variant (Default)</h3>
			<div class="demo-box">
				<Tabs>
					<div class="ax-tabs__list" role="tablist">
						{#each labels as label, i}
							<Tab {label} index={i} />
						{/each}
					</div>
					<div class="ax-tabs__panels">
						{#each mockContent as content, i}
							<TabPanel index={i}>
								<p>{content}</p>
							</TabPanel>
						{/each}
					</div>
				</Tabs>
			</div>
		</section>

		<section>
			<h3>Boxed Variant</h3>
			<div class="demo-box">
				<Tabs variant="boxed">
					<div class="ax-tabs__list" role="tablist">
						{#each labels as label, i}
							<Tab {label} index={i} />
						{/each}
					</div>
					<div class="ax-tabs__panels">
						{#each mockContent as content, i}
							<TabPanel index={i}>
								<p>{content}</p>
								<div class="actions">
									<Pressable variant="outline" size="sm">Export Data</Pressable>
									<Pressable variant="primary" size="sm">Refresh Data</Pressable>
								</div>
							</TabPanel>
						{/each}
					</div>
				</Tabs>
			</div>
		</section>

		<section>
			<h3>Initial Active Tab</h3>
			<div class="demo-box">
				<Tabs activeTab={2}>
					<div class="ax-tabs__list" role="tablist">
						{#each labels as label, i}
							<Tab {label} index={i} />
						{/each}
					</div>
					<div class="ax-tabs__panels">
						{#each mockContent as content, i}
							<TabPanel index={i}>
								<p>{content}</p>
							</TabPanel>
						{/each}
					</div>
				</Tabs>
			</div>
		</section>
	</div>
</Story>

<style>
	.story-grid {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 4rem;
		background: var(--color-background);
		min-height: 100vh;
	}

	.demo-box {
		background: var(--color-surface);
		padding: var(--space-4);
		border-radius: var(--space-1);
		border: var(--line-thin) solid var(--color-outline-variant);
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}

	.actions {
		display: flex;
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	p {
		font-family: var(--font-sans);
		line-height: var(--leading-relaxed);
		color: var(--color-on-surface);
	}
</style>
