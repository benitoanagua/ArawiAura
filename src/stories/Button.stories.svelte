<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from '$lib/components/Button.svelte';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'radio' },
        options: ['primary', 'secondary', 'outline', 'ghost'],
      },
      size: {
        control: { type: 'radio' },
        options: ['sm', 'md', 'lg'],
      },
      disabled: { control: 'boolean' },
      href: { control: 'text' },
      type: {
        control: { type: 'radio' },
        options: ['button', 'submit', 'reset'],
      },
      fullWidth: { control: 'boolean' },
      icon: { control: 'boolean' },
    },
    args: {
      onclick: fn(),
    }
  });
</script>

<Story 
  name="Primary" 
  args={{
    variant: 'primary',
    size: 'md'
  }}
>
  Primary Button
</Story>

<Story 
  name="Secondary" 
  args={{
    variant: 'secondary',
    size: 'md'
  }}
>
  Secondary Button
</Story>

<Story 
  name="Outline" 
  args={{
    variant: 'outline',
    size: 'md'
  }}
>
  Outline Button
</Story>

<Story 
  name="Ghost" 
  args={{
    variant: 'ghost',
    size: 'md'
  }}
>
  Ghost Button
</Story>

<Story 
  name="Small" 
  args={{
    variant: 'primary',
    size: 'sm'
  }}
>
  Small Button
</Story>

<Story 
  name="Large" 
  args={{
    variant: 'primary',
    size: 'lg'
  }}
>
  Large Button
</Story>

<Story 
  name="Disabled" 
  args={{
    variant: 'primary',
    size: 'md',
    disabled: true
  }}
>
  Disabled Button
</Story>

<Story 
  name="Full Width" 
  args={{
    variant: 'primary',
    size: 'md',
    fullWidth: true
  }}
>
  Full Width Button
</Story>

<Story 
  name="With Icon" 
  args={{
    variant: 'primary',
    size: 'md',
    icon: true
  }}
>
  Button with Icon
</Story>

<Story 
  name="As Link" 
  args={{
    variant: 'primary',
    size: 'md',
    href: '/some-page'
  }}
>
  Link Button
</Story>