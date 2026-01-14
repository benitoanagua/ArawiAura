<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from '$lib/components/Input.svelte';

	const { Story } = defineMeta({
		title: 'Components/Input',
		tags: ['autodocs']
	});
</script>

<Story name="Input Types">
	<div class="story-grid">
		<section>
			<h3>Basic Inputs</h3>
			<div class="form-grid">
				<Input 
					type="text" 
					label="Text Input" 
					placeholder="Enter text here"
				/>
				
				<Input 
					type="email" 
					label="Email Input" 
					placeholder="email@example.com"
				/>
				
				<Input 
					type="password" 
					label="Password Input" 
					placeholder="Enter password"
				/>
				
				<Input 
					type="number" 
					label="Number Input" 
					placeholder="Enter number"
				/>
			</div>
		</section>

		<section>
			<h3>Input States</h3>
			<div class="form-grid">
				<Input 
					type="text" 
					label="Default Input" 
					placeholder="Default state"
				/>
				
				<Input 
					type="text" 
					label="Disabled Input" 
					placeholder="Disabled state"
					disabled
				/>
				
				<Input 
					type="text" 
					label="Input with Error" 
					placeholder="Error state"
					error="This field is required"
				/>
			</div>
		</section>

		<section>
			<h3>Input Variations</h3>
			<div class="form-grid">
				<Input 
					type="search" 
					label="Search Input" 
					placeholder="Search..."
				/>
				
				<Input 
					type="tel" 
					label="Phone Input" 
					placeholder="+1 (555) 123-4567"
				/>
				
				<Input 
					type="url" 
					label="URL Input" 
					placeholder="https://example.com"
				/>
			</div>
		</section>
	</div>
</Story>

<Story name="Variations">
	<div class="story-grid">
		<section>
			<h3>Variations</h3>
			<div class="form-grid">
				<Input 
					type="text" 
					label="Required Field" 
					placeholder="This field is required"
					required
				/>
				
				<Input 
					type="text" 
					label="With Description" 
					placeholder="Enter your name"
					description="Please enter your full name"
				/>
				
				<Input 
					type="text" 
					label="Disabled Input" 
					placeholder="Cannot edit this"
					disabled
					value="Disabled value"
				/>
				
				<Input 
					type="text" 
					label="Read-only Input" 
					placeholder="Cannot edit this"
					readonly
					value="Read-only value"
				/>
			</div>
		</section>
		<section>
			<h2>Textarea</h2>
			<div class="story-form">
			<Input 
				type="textarea" 
				label="Message" 
				placeholder="Enter your message here"
				rows={4}
			/>
			
			<Input 
				type="textarea" 
				label="Description" 
				placeholder="Detailed description"
				description="Provide a comprehensive description of your content"
				rows={6}
			/>
		</div>
	</section>
	</div>
</Story>

<style>
	.story-grid {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		background: var(--color-background);
		min-height: 100vh;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		align-items: start;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}
</style>