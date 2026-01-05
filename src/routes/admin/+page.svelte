<script lang="ts">
	import { onMount } from 'svelte';
	
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
		<h1>Administración - Arawi Aura</h1>
		<nav>
			<a href="/">← Volver al blog</a>
		</nav>
	</header>

	<main class="admin-main">
		<section class="db-section">
			<h2>Estado de la Base de Datos</h2>
			
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
					<button 
						on:click={checkDatabaseStatus}
						disabled={dbStatus === 'checking'}
						class="btn-secondary"
					>
						Verificar Conexión
					</button>
					
					{#if dbStatus === 'disconnected' || dbStatus === 'error'}
						<button 
							on:click={initializeDatabase}
							disabled={isInitializing}
							class="btn-primary"
						>
							{isInitializing ? 'Inicializando...' : 'Inicializar Base de Datos'}
						</button>
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
				<h2>Herramientas</h2>
				
				<div class="tools-grid">
					<div class="tool-card">
						<h3>Posts</h3>
						<p>Gestionar artículos del blog</p>
						<button class="btn-secondary" disabled>Próximamente</button>
					</div>
					
					<div class="tool-card">
						<h3>Tags</h3>
						<p>Administrar etiquetas</p>
						<button class="btn-secondary" disabled>Próximamente</button>
					</div>
					
					<div class="tool-card">
						<h3>Configuración</h3>
						<p>Ajustes del sitio</p>
						<button class="btn-secondary" disabled>Próximamente</button>
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

	.admin-header h1 {
		margin: 0;
		color: #1a202c;
		font-size: 1.5rem;
	}

	.admin-header nav a {
		color: #3182ce;
		text-decoration: none;
		font-size: 0.875rem;
	}

	.admin-header nav a:hover {
		text-decoration: underline;
	}

	.admin-main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.db-section {
		margin-bottom: 3rem;
	}

	.db-section h2 {
		margin-bottom: 1rem;
		color: #2d3748;
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

	.btn-primary,
	.btn-secondary {
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: none;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #3182ce;
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background: #2c5282;
	}

	.btn-secondary {
		background: #edf2f7;
		color: #4a5568;
		border: 1px solid #e2e8f0;
	}

	.btn-secondary:hover:not(:disabled) {
		background: #e2e8f0;
	}

	.btn-primary:disabled,
	.btn-secondary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.message {
		padding: 0.75rem;
		background: #f7fafc;
		border-radius: 0.25rem;
		font-family: monospace;
		font-size: 0.875rem;
	}

	.tools-section h2 {
		margin-bottom: 1rem;
		color: #2d3748;
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

	.tool-card h3 {
		margin: 0 0 0.5rem 0;
		color: #2d3748;
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