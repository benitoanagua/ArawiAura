<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Carousel from '$lib/components/Carousel.svelte';
  import CarouselItem from '$lib/components/CarouselItem.svelte';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/Carousel',
    component: Carousel,
    tags: ['autodocs'],
    argTypes: {
      autoPlay: { control: 'boolean' },
      interval: { control: { type: 'range', min: 1000, max: 10000, step: 500 } },
      showArrows: { control: 'boolean' },
      showIndicators: { control: 'boolean' },
    }
  });
</script>

<Story 
  name="Basic Carousel" 
  args={{
    autoPlay: false,
    showArrows: true,
    showIndicators: true
  }}
>
  {#snippet children()}
    {@const registerItem = (item: any) => {
      // Mock registerItem function for Storybook
      return 0;
    }}
    <CarouselItem {registerItem} index={0}>
      <div style="padding: 2rem; background: var(--bg-warm); text-align: center;">
        <h3>First Slide</h3>
        <p>This is the content of the first carousel slide.</p>
      </div>
    </CarouselItem>
    <CarouselItem {registerItem} index={1}>
      <div style="padding: 2rem; background: var(--bg-cool); text-align: center;">
        <h3>Second Slide</h3>
        <p>This is the content of the second carousel slide.</p>
      </div>
    </CarouselItem>
    <CarouselItem {registerItem} index={2}>
      <div style="padding: 2rem; background: var(--accent-primary); color: white; text-align: center;">
        <h3>Third Slide</h3>
        <p>This is the content of the third carousel slide.</p>
      </div>
    </CarouselItem>
  {/snippet}
</Story>

<Story 
  name="Auto Play Carousel" 
  args={{
    autoPlay: true,
    interval: 3000,
    showArrows: true,
    showIndicators: true
  }}
>
  {#snippet children()}
    {@const registerItem = (item: any) => {
      // Mock registerItem function for Storybook
      return 0;
    }}
    <CarouselItem {registerItem} index={0}>
      <div style="padding: 2rem; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; text-align: center;">
        <h3>Auto Play Slide 1</h3>
        <p>This carousel will automatically advance every 3 seconds.</p>
      </div>
    </CarouselItem>
    <CarouselItem {registerItem} index={1}>
      <div style="padding: 2rem; background: linear-gradient(45deg, #45b7d1, #96ceb4); color: white; text-align: center;">
        <h3>Auto Play Slide 2</h3>
        <p>Notice the smooth transitions between slides.</p>
      </div>
    </CarouselItem>
    <CarouselItem {registerItem} index={2}>
      <div style="padding: 2rem; background: linear-gradient(45deg, #f9ca24, #f0932b); color: white; text-align: center;">
        <h3>Auto Play Slide 3</h3>
        <p>You can pause the auto-play by hovering over the carousel.</p>
      </div>
    </CarouselItem>
  {/snippet}
</Story>

<Story 
  name="Minimal Carousel" 
  args={{
    autoPlay: false,
    showArrows: false,
    showIndicators: false
  }}
>
  {#snippet children()}
    {@const registerItem = (item: any) => {
      // Mock registerItem function for Storybook
      return 0;
    }}
    <CarouselItem {registerItem} index={0}>
      <div style="padding: 2rem; background: var(--bg-subtle); text-align: center;">
        <h3>Minimal Design</h3>
        <p>No arrows or indicators - clean and simple.</p>
      </div>
    </CarouselItem>
    <CarouselItem {registerItem} index={1}>
      <div style="padding: 2rem; background: var(--bg-subtle); text-align: center;">
        <h3>Focus on Content</h3>
        <p>Just the essential carousel functionality.</p>
      </div>
    </CarouselItem>
  {/snippet}
</Story>

<Story 
  name="Image Carousel" 
  args={{
    autoPlay: false,
    showArrows: true,
    showIndicators: true
  }}
>
  {#snippet children()}
    {@const registerItem = (item: any) => {
      // Mock registerItem function for Storybook
      return 0;
    }}
    <CarouselItem {registerItem} index={0}>
      <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <div style="text-align: center;">
          <h3>Nature Photography</h3>
          <p>Beautiful landscapes and scenic views</p>
        </div>
      </div>
    </CarouselItem>
    <CarouselItem {registerItem} index={1}>
      <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white;">
        <div style="text-align: center;">
          <h3>Urban Architecture</h3>
          <p>Modern buildings and city skylines</p>
        </div>
      </div>
    </CarouselItem>
    <CarouselItem {registerItem} index={2}>
      <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white;">
        <div style="text-align: center;">
          <h3>Abstract Art</h3>
          <p>Creative compositions and artistic expressions</p>
        </div>
      </div>
    </CarouselItem>
  {/snippet}
</Story>