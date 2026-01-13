<script lang="ts">
	import type { PageMetaProps } from '$lib/types/page-meta.js';
	import type { User } from '$lib/db/types';
	import Drop from '$lib/components/Drop.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	interface BottomNavProps extends PageMetaProps {
		user?: User | null;
	}

	let {
		copyright = `© ${new Date().getFullYear()}`,
		user = null,
		userMenuOptions,
		guestNavOptions,
		class: className
	}: BottomNavProps = $props();

	async function handleLogout() {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			window.location.href = '/';
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	// Default user menu options
	function getDefaultUserMenuOptions() {
		return [
			{ label: 'Profile', iconComponent: 'carbon:user', href: user ? `/author/${user.slug}` : '' },
			{ label: 'Settings', iconComponent: 'carbon:settings', href: '/settings' },
			{ divider: true },
			{ label: 'Logout', iconComponent: 'carbon:logout', value: 'logout' }
		];
	}

	// Default guest navigation options
	function getDefaultGuestNavOptions() {
		return [
			{ label: 'Sign In', iconComponent: 'carbon:login', href: '/login' },
			{ label: 'Sign Up', iconComponent: 'carbon:user-follow', href: '/signup' }
		];
	}

	// Use provided options or defaults
	const finalUserMenuOptions = () => userMenuOptions || getDefaultUserMenuOptions();
	const finalGuestNavOptions = () => guestNavOptions || getDefaultGuestNavOptions();

	async function handleUserMenuSelect(option: any) {
		if (option.value === 'logout') {
			try {
				await fetch('/api/auth/logout', { method: 'POST' });
				window.toast?.success('Logged out successfully');
				await goto('/');
			} catch (error) {
				window.toast?.error('Logout failed');
			}
		}
	}

	function handleGuestNavSelect(option: any) {
		if (option.href) {
			goto(option.href);
		}
	}
</script>

<!-- Simplified Footer with Two Slots -->
<footer class="ax-footer">
	<div class="ax-footer__container">
		<!-- Left Slot: Credits -->
		<div class="ax-footer__left">
			<span class="ax-footer__credits">{copyright}</span>
		</div>
		
		<!-- Right Slot: Menu -->
		<div class="ax-footer__right">
			{#if user}
				<Drop 
					options={finalUserMenuOptions()} 
					onSelect={handleUserMenuSelect}
					align="right"
				>
					<Pressable variant="ghost" size="sm">
						{user.name} 
						<Icon icon="carbon:chevron-down" width="1.1em" height="1.1em" />
					</Pressable>
				</Drop>
			{:else}
				<div class="ax-footer__guest-actions">
					{#each finalGuestNavOptions() as option}
						<Pressable 
							variant="ghost" 
							size="sm"
							onclick={() => handleGuestNavSelect(option)}
						>
							{#if option.iconComponent}
								<Icon icon={option.iconComponent} width="1.2em" height="1.2em" />
							{/if}
							{option.label}
						</Pressable>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</footer>

<style>
	/* Simplified Footer with Two Slots - Fixed at Bottom */
	.ax-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background-color: var(--color-surface);
		border-top: var(--line-thin) solid var(--stroke-medium);
		box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
	}

	.ax-footer__container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: 0 var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		height: 60px;
	}

	.ax-footer__left {
		display: flex;
		align-items: center;
	}

	.ax-footer__credits {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
	}

	.ax-footer__right {
		display: flex;
		align-items: center;
	}

	.ax-footer__guest-actions {
		display: flex;
		gap: var(--space-2);
		align-items: center;
	}
	/* Responsive adjustments */
	@media (max-width: 768px) {
		.ax-footer__container {
			padding: 0 var(--space-3);
			gap: var(--space-3);
		}
	
		.ax-footer {
			padding: var(--space-1-5) 0;
		}
	}

	@media (max-width: 480px) {
		.ax-footer__container {
			padding: 0 var(--space-2);
		}
	
		.ax-footer__credits {
			font-size: var(--text-xs);
		}
	
		.ax-footer {
			padding: var(--space-1) 0;
		}
	}
</style>
