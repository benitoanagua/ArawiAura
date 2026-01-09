<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Accordion from '$lib/components/Accordion.svelte';
	import AccordionItem from '$lib/components/AccordionItem.svelte';
	import { randParagraph, randSentence, randProductName } from '@ngneat/falso';

	const { Story } = defineMeta({
		title: 'Components/Accordion',
		component: Accordion,
		tags: ['autodocs']
	});

	// Generate some fake data
	const sections = Array.from({ length: 5 }, (_, i) => ({
		id: i,
		title: randProductName(),
		content: randParagraph()
	}));
</script>

<Story name="Accordion Overview">
	<div class="story-grid">
		<section>
			<h3>Standard (Single Expansion)</h3>
			<Accordion multiple={false}>
				{#each sections.slice(0, 3) as section, i}
					<AccordionItem title={section.title} index={i}>
						<p>{section.content}</p>
					</AccordionItem>
				{/each}
			</Accordion>
		</section>

		<section>
			<h3>Multiple Expansion</h3>
			<Accordion multiple={true}>
				{#each sections as section, i}
					<AccordionItem title={section.title} index={i}>
						<p>{section.content}</p>
					</AccordionItem>
				{/each}
			</Accordion>
		</section>

		<section>
			<h3>Minimal Content</h3>
			<Accordion>
				<AccordionItem title="Short Entry" index={0}>
					<p>{randSentence()}</p>
				</AccordionItem>
				<AccordionItem title="Another Short Entry" index={1}>
					<p>{randSentence()}</p>
				</AccordionItem>
			</Accordion>
		</section>

		<section>
			<h3>Rich Content Mix</h3>
			<Accordion multiple={true}>
				<AccordionItem title="Product Features" index={0}>
					<ul>
						<li>{randSentence()}</li>
						<li>{randSentence()}</li>
						<li>{randSentence()}</li>
					</ul>
				</AccordionItem>
				<AccordionItem title="Code Block" index={1}>
					<pre><code>{`function test() {\n  console.log("${randSentence()}");\n}`}</code></pre>
				</AccordionItem>
				<AccordionItem title="Detailed Description" index={2}>
					<p>{randParagraph()}</p>
					<p>{randParagraph()}</p>
				</AccordionItem>
			</Accordion>
		</section>
	</div>
</Story>

<style>
	.story-grid {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding: 2rem;
		min-height: 100vh;
		background-color: var(--color-background);
		color: var(--color-on-background);
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}
</style>
