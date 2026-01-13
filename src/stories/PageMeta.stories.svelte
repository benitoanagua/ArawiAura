<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import type { User } from '$lib/db/types';

	// Mock user data for stories
	const mockUser: User = {
		id: 'user_123',
		name: 'John Doe',
		email: 'john@example.com',
		slug: 'john-doe',
		role: 'author',
		bio: 'Writer and poet',
		profile_image: undefined,
		enabled: true,
		created_at: new Date().toISOString()
	};

	const { Story } = defineMeta({
		title: 'Components/PageMeta',
		tags: ['autodocs']
	});
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Guest View</h3>
			<div class="demo-box">
				<PageMeta />
			</div>
		</section>

		<section>
			<h3>Authenticated User</h3>
			<div class="demo-box">
				<PageMeta
					user={mockUser}
				/>
			</div>
		</section>
		
		<section>
			<h3>Custom Copyright</h3>
			<div class="demo-box">
				<PageMeta
					copyright="© 2026 Benito Anagua"
				/>
			</div>
		</section>

		<section>
			<h3>Admin User</h3>
			<div class="demo-box">
				<PageMeta
					user={{...mockUser, role: 'admin'}}
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
		background: var(--color-surface);
		min-height: 100vh;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}

	.demo-box {
		/* No padding here to simulate footer at bottom */
		background: var(--color-surface-container-lowest);
		border: var(--line-thin) solid var(--color-outline-variant);
	}
</style>
