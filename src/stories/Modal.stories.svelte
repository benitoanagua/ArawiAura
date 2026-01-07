<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Modal from '$lib/components/Modal.svelte';
  import { fn } from 'storybook/test';
  import { tick } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
      open: { control: 'boolean' },
      title: { control: 'text' },
      closable: { control: 'boolean' },
      backdrop: { control: 'boolean' },
      maxWidth: {
        control: { type: 'radio' },
        options: ['sm', 'md', 'lg', 'xl'],
      },
    },
    args: {
      onclick: fn(),
    }
  });
</script>

<Story 
  name="Basic Modal" 
  args={{
    open: true,
    title: 'Basic Modal',
    closable: true,
    backdrop: true,
    maxWidth: 'md'
  }}
>
  <p>This is a basic modal with a title and some content.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
    <button style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Confirm
    </button>
    <button style="padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Cancel
    </button>
  </div>
</Story>

<Story 
  name="Without Title" 
  args={{
    open: true,
    closable: true,
    backdrop: true,
    maxWidth: 'sm'
  }}
>
  <div style="text-align: center; padding: 2rem;">
    <h3>Confirmation Required</h3>
    <p>Are you sure you want to proceed with this action?</p>
    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem;">
      <button style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Yes
      </button>
      <button style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
        No
      </button>
    </div>
  </div>
</Story>

<Story 
  name="Large Content" 
  args={{
    open: true,
    title: 'Large Content Modal',
    closable: true,
    backdrop: true,
    maxWidth: 'lg'
  }}
>
  <h4>Article Content</h4>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  
  <h5>Section 1</h5>
  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  
  <h5>Section 2</h5>
  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
  
  <ul>
    <li>Point one with detailed explanation</li>
    <li>Point two covering important aspects</li>
    <li>Point three with additional information</li>
  </ul>
</Story>

<Story 
  name="Form Modal" 
  args={{
    open: true,
    title: 'Contact Form',
    closable: true,
    backdrop: true,
    maxWidth: 'md'
  }}
>
  <form style="display: flex; flex-direction: column; gap: 1rem;">
    <div>
      <label for="name" style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Name</label>
      <input 
        type="text" 
        id="name" 
        placeholder="Enter your name" 
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
      />
    </div>
    
    <div>
      <label for="email" style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Email</label>
      <input 
        type="email" 
        id="email" 
        placeholder="Enter your email" 
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
      />
    </div>
    
    <div>
      <label for="message" style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Message</label>
      <textarea 
        id="message" 
        placeholder="Enter your message" 
        rows="4"
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; resize: vertical;"
      ></textarea>
    </div>
    
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;">
      <button 
        type="button"
        style="padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        Cancel
      </button>
      <button 
        type="submit"
        style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        Send Message
      </button>
    </div>
  </form>
</Story>

<Story 
  name="Without Backdrop Close" 
  args={{
    open: true,
    title: 'Important Notice',
    closable: true,
    backdrop: false,
    maxWidth: 'sm'
  }}
>
  <div style="text-align: center;">
    <p style="margin-bottom: 1rem;">This modal cannot be closed by clicking the backdrop.</p>
    <p style="margin-bottom: 1rem;">You must use the close button or press Escape.</p>
    <button style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
      I Understand
    </button>
  </div>
</Story>