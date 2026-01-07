<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Accordion from '$lib/components/Accordion.svelte';
  import AccordionItem from '$lib/components/AccordionItem.svelte';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    argTypes: {
      multiple: { control: 'boolean' },
    },
    args: {
      onclick: fn(),
    }
  });
</script>

<Story 
  name="Single Expansion" 
  args={{
    multiple: false
  }}
>
  <Accordion multiple={false}>
    <AccordionItem title="First Section" index={0}>
      <p>This is the content of the first accordion section. It can contain any HTML content including paragraphs, lists, or other components.</p>
      <ul>
        <li>Feature one</li>
        <li>Feature two</li>
        <li>Feature three</li>
      </ul>
    </AccordionItem>
    <AccordionItem title="Second Section" index={1}>
      <p>This is the content of the second accordion section. Only one section can be open at a time in single expansion mode.</p>
    </AccordionItem>
    <AccordionItem title="Third Section" index={2}>
      <p>This is the content of the third accordion section. Click on different headers to see the accordion behavior.</p>
    </AccordionItem>
  </Accordion>
</Story>

<Story 
  name="Multiple Expansion" 
  args={{
    multiple: true
  }}
>
  <Accordion multiple={true}>
    <AccordionItem title="First Item" index={0}>
      <p>You can expand multiple sections simultaneously when multiple mode is enabled.</p>
    </AccordionItem>
    <AccordionItem title="Second Item" index={1}>
      <p>This section can be open while others are also open.</p>
    </AccordionItem>
    <AccordionItem title="Third Item" index={2}>
      <p>All sections can be expanded at the same time in this mode.</p>
    </AccordionItem>
  </Accordion>
</Story>

<Story 
  name="With Rich Content" 
  args={{
    multiple: false
  }}
>
  <Accordion multiple={false}>
    <AccordionItem title="Rich Content Example" index={0}>
      <h4>Featured Content</h4>
      <p>This accordion contains rich HTML content:</p>
      <ul>
        <li><strong>Bold text</strong> for emphasis</li>
        <li><em>Italic text</em> for subtle points</li>
        <li>Regular text for normal content</li>
      </ul>
      <blockquote>
        This is a blockquote showing how quotes can be displayed within accordions.
      </blockquote>
    </AccordionItem>
    <AccordionItem title="Code Example" index={1}>
      <pre><code>{`// Sample JavaScript code
function helloWorld() {
  console.log('Hello, World!');
}`}</code></pre>
    </AccordionItem>
  </Accordion>
</Story>