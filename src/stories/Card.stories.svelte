<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from '$lib/components/Card.svelte';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      url: { control: 'text' },
      excerpt: { control: 'text' },
      featureImage: { control: 'text' },
      authorName: { control: 'text' },
      authorUrl: { control: 'text' },
      authorProfileImage: { control: 'text' },
      tagName: { control: 'text' },
      tagUrl: { control: 'text' },
      readingTime: { control: 'text' },
      publishedAt: { control: 'text' },
      mediaAlign: {
        control: { type: 'select' },
        options: ['left', 'right', 'top', 'bottom'],
      },
      mediaWidth: {
        control: { type: 'select' },
        options: ['is-one-fifth', 'is-one-quarter', 'is-one-third', 'is-two-fifths', 'is-half'],
      },
      density: {
        control: { type: 'radio' },
        options: ['normal', 'compact', 'minimal'],
      },
      aspectRatio: {
        control: { type: 'radio' },
        options: ['monitor', 'square', 'video'],
      },
      elevation: {
        control: { type: 'range', min: 0, max: 3, step: 1 },
      },
      headingLevel: {
        control: { type: 'range', min: 1, max: 6, step: 1 },
      },
    },
    args: {
      onclick: fn(),
    }
  });
</script>

<Story 
  name="Default" 
  args={{
    title: 'Sample Card Title',
    url: '/sample-post',
    excerpt: 'This is a sample excerpt for the card component demonstrating its basic functionality.',
    featureImage: 'https://picsum.photos/400/300',
    authorName: 'John Doe',
    authorUrl: '/author/john-doe',
    tagName: 'Technology',
    tagUrl: '/tag/technology',
    readingTime: '5 min read',
    publishedAt: new Date().toISOString(),
    mediaAlign: 'left',
    density: 'normal',
    aspectRatio: 'monitor',
    elevation: 2,
    headingLevel: 4
  }} 
/>

<Story 
  name="With Author Profile" 
  args={{
    title: 'Card with Author Profile',
    url: '/post-with-author',
    excerpt: 'This card demonstrates the author profile image feature.',
    featureImage: 'https://picsum.photos/400/300?random=1',
    authorName: 'Jane Smith',
    authorUrl: '/author/jane-smith',
    authorProfileImage: 'https://i.pravatar.cc/150?img=12',
    tagName: 'Design',
    tagUrl: '/tag/design',
    readingTime: '8 min read',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    mediaAlign: 'top',
    density: 'normal',
    aspectRatio: 'square',
    elevation: 3,
    headingLevel: 3
  }} 
/>

<Story 
  name="Compact Density" 
  args={{
    title: 'Compact Card',
    url: '/compact-post',
    excerpt: 'A more compact version of the card with less spacing.',
    featureImage: 'https://picsum.photos/300/200?random=2',
    authorName: 'Bob Johnson',
    authorUrl: '/author/bob-johnson',
    tagName: 'Development',
    tagUrl: '/tag/development',
    readingTime: '12 min read',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    mediaAlign: 'right',
    density: 'compact',
    aspectRatio: 'video',
    elevation: 1,
    headingLevel: 5
  }} 
/>

<Story 
  name="Minimal Density" 
  args={{
    title: 'Minimal Card',
    url: '/minimal-post',
    authorName: 'Alice Brown',
    authorUrl: '/author/alice-brown',
    tagName: 'Tutorial',
    tagUrl: '/tag/tutorial',
    readingTime: '3 min read',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    density: 'minimal',
    elevation: 2,
    headingLevel: 4
  }} 
/>

<Story 
  name="Elevation Levels" 
  args={{
    title: 'Different Elevations',
    url: '/elevation-demo',
    excerpt: 'Showcasing different elevation levels from 0 to 3.',
    featureImage: 'https://picsum.photos/400/300?random=3',
    authorName: 'Charlie Wilson',
    authorUrl: '/author/charlie-wilson',
    tagName: 'Demo',
    tagUrl: '/tag/demo',
    readingTime: '6 min read',
    publishedAt: new Date().toISOString(),
    density: 'compact',
    elevation: 0,
    headingLevel: 4
  }} 
/>