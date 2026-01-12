<script lang="ts">
	import { onMount } from 'svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Heading from '$lib/components/Heading.svelte';
	
	let dbStatus: 'checking' | 'connected' | 'disconnected' | 'error' = 'checking';
	let isInitializing = false;
	let initMessage = '';
	
	async function checkDatabaseStatus() {
		try {
			const response = await fetch('/api/db/status');
			const data = await response.json();
			
			dbStatus = data.connected ? 'connected' : 'disconnected';
		} catch (error) {
			dbStatus = 'error';
		}
	}
	
	async function initializeDatabase() {
		isInitializing = true;
		initMessage = '';
		
		try {
			const response = await fetch('/api/db/init', {
				method: 'POST'
			});
			
			const data = await response.json();
			
			if (data.success) {
				initMessage = '✅ ' + data.message;
				await checkDatabaseStatus();
			} else {
				initMessage = '❌ ' + data.message;
			}
		} catch (error) {
			initMessage = '❌ Error de conexión';
		} finally {
			isInitializing = false;
		}
	}
	
	onMount(() => {
		checkDatabaseStatus();
	});
</script>

<svelte:head>
	<title>Admin - Arawi Aura</title>
</svelte:head>

<div class="admin-container">
	<header class="admin-header">
		<Heading level={1}>Administración - Arawi Aura</Heading>
		<nav>
			<Pressable href="/" variant="ghost">← Volver al blog</Pressable>
		</nav>
	</header>

	<main class="admin-main">
		<section class="db-section">
			<Heading level={2}>Estado de la Base de Datos</Heading>
			
			<div class="status-card">
				<div class="status-indicator">
					{#if dbStatus === 'checking'}
						<span class="status checking">🔍 Verificando...</span>
					{:else if dbStatus === 'connected'}
						<span class="status connected">✅ Conectado</span>
					{:else if dbStatus === 'disconnected'}
						<span class="status disconnected">❌ Desconectado</span>
					{:else}
						<span class="status error">⚠️ Error</span>
					{/if}
				</div>
				
				<div class="actions">
					<Pressable 
						onclick={checkDatabaseStatus}
						variant="outline"
						disabled={dbStatus === 'checking'}
					>
						Verificar Conexión
					</Pressable>
					
					{#if dbStatus === 'disconnected' || dbStatus === 'error'}
						<Pressable 
							onclick={initializeDatabase}
							disabled={isInitializing}
							variant="primary"
						>
							{isInitializing ? 'Inicializando...' : 'Inicializar Base de Datos'}
						</Pressable>
					{/if}
				</div>
				
				{#if initMessage}
					<div class="message">
						{initMessage}
					</div>
				{/if}
			</div>
		</section>

		{#if dbStatus === 'connected'}
			<section class="tools-section">
				<Heading level={2}>Herramientas</Heading>
				
				<div class="tools-grid">
					<div class="tool-card">
						<Heading level={3}>Posts</Heading>
						<p>Gestionar artículos del blog</p>
						<Pressable variant="outline" disabled>Próximamente</Pressable>
					</div>
					
					<div class="tool-card">
						<Heading level={3}>Tags</Heading>
						<p>Administrar etiquetas</p>
						<Pressable variant="outline" disabled>Próximamente</Pressable>
					</div>
					
					<div class="tool-card">
						<Heading level={3}>Configuración</Heading>
						<p>Ajustes del sitio</p>
						<Pressable variant="outline" disabled>Próximamente</Pressable>
					</div>
				</div>
			</section>
		{/if}
	</main>
</div>

<style>
	.admin-container {
		min-height: 100vh;
		background: #f8fafc;
	}

	.admin-header {
		background: white;
		border-bottom: 1px solid #e2e8f0;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}



	.admin-main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.db-section {
		margin-bottom: 3rem;
	}



	.status-card {
		background: white;
		border-radius: 0.5rem;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.status-indicator {
		margin-bottom: 1rem;
	}

	.status {
		font-weight: 600;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		display: inline-block;
	}

	.status.checking {
		background: #fef5e7;
		color: #744210;
	}

	.status.connected {
		background: #f0fff4;
		color: #22543d;
	}

	.status.disconnected,
	.status.error {
		background: #fed7d7;
		color: #742a2a;
	}

	.actions {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}



	.message {
		padding: 0.75rem;
		background: #f7fafc;
		border-radius: 0.25rem;
		font-family: monospace;
		font-size: 0.875rem;
	}



	.tools-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.tool-card {
		background: white;
		border-radius: 0.5rem;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}



	.tool-card p {
		margin: 0 0 1rem 0;
		color: #718096;
		font-size: 0.875rem;
	}

	@media (max-width: 768px) {
		.admin-header {
			padding: 1rem;
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.admin-main {
			padding: 1rem;
		}

		.actions {
			flex-direction: column;
		}

		.tools-grid {
			grid-template-columns: 1fr;
		}
	}
</style>