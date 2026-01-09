<script module>
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

<Story name="Standard (Single)">
	<Accordion multiple={false}>
		{#each sections.slice(0, 3) as section, i}
			<AccordionItem title={section.title} index={i}>
				<p>{section.content}</p>
			</AccordionItem>
		{/each}
	</Accordion>
</Story>

<Story name="Multiple Expansion">
	<Accordion multiple={true}>
		{#each sections as section, i}
			<AccordionItem title={section.title} index={i}>
				<p>{section.content}</p>
			</AccordionItem>
		{/each}
	</Accordion>
</Story>

<Story name="Minimal Content">
	<Accordion>
		<AccordionItem title="Short Entry" index={0}>
			<p>{randSentence()}</p>
		</AccordionItem>
		<AccordionItem title="Another Short Entry" index={1}>
			<p>{randSentence()}</p>
		</AccordionItem>
	</Accordion>
</Story>

<Story name="Rich Content Mix">
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
</Story>
