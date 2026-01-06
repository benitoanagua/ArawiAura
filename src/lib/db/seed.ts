/**
 * Funciones para inicializar y poblar la base de datos
 * Siguiendo las convenciones de SvelteKit
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { Surreal } from 'surrealdb';
import { DB_CONFIG } from './config';

/**
 * Conecta a la base de datos para operaciones de seed
 */
async function connectForSeed(): Promise<Surreal> {
	const db = new Surreal();
	
	try {
		// Add /rpc to the URL if not already present
		const connectUrl = DB_CONFIG.URL.endsWith('/rpc') ? DB_CONFIG.URL : `${DB_CONFIG.URL}/rpc`;
		await db.connect(connectUrl);
		
		// Use database-level authentication
		await db.signin({
			username: DB_CONFIG.USERNAME,
			password: DB_CONFIG.PASSWORD,
			namespace: DB_CONFIG.NAMESPACE,
			database: DB_CONFIG.DATABASE
		});
	} catch (error) {
		console.error('Error connecting to SurrealDB:', error);
		console.log('Connection details:');
		console.log('  URL:', DB_CONFIG.URL);
		console.log('  Namespace:', DB_CONFIG.NAMESPACE);
		console.log('  Database:', DB_CONFIG.DATABASE);
		console.log('  Username:', DB_CONFIG.USERNAME ? 'Provided' : 'Missing');
		console.log('  Password:', DB_CONFIG.PASSWORD ? 'Provided' : 'Missing');
		throw error;
	}
	
	return db;
}

/**
 * Ejecuta el esquema SQL desde el archivo
 */
export async function runSchema(): Promise<void> {
	const db = await connectForSeed();
	
	try {
		console.log('🚀 Ejecutando esquema de base de datos...');
		
		// Leer el archivo de esquema
		const schemaPath = join(process.cwd(), 'src/lib/db/schema.surql');
		const schema = readFileSync(schemaPath, 'utf-8');
		
		// Ejecutar el esquema línea por línea
		const statements = schema
			.split(';')
			.map(stmt => stmt.trim())
			.filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
		
		console.log(`📝 Ejecutando ${statements.length} declaraciones...`);
		
		for (const [index, statement] of statements.entries()) {
			try {
				await db.query(statement);
				console.log(`   ✓ Declaración ${index + 1}/${statements.length} ejecutada`);
			} catch (error) {
				console.warn(`   ⚠️  Declaración ${index + 1} falló (puede ser normal si ya existe):`, error);
			}
		}
		
		console.log('✅ Esquema ejecutado correctamente');
		
	} catch (error) {
		console.error('❌ Error ejecutando esquema:', error);
		throw error;
	} finally {
		await db.close();
	}
}

/**
 * Crea datos de ejemplo para desarrollo
 */
export async function seedDevelopmentData(): Promise<void> {
	const db = await connectForSeed();
	
	try {
		console.log('🌱 Creando datos de desarrollo...');
		
		// Verificar si ya existe el post de ejemplo
		try {
			const existingExamplePost = await db.query('SELECT * FROM post:ejemplo;');
			if ((existingExamplePost[0] as any)?.result?.length > 0) {
				console.log('📊 El post de ejemplo ya existe, omitiendo seed de desarrollo');
				return;
			}
		} catch (error) {
			// If the query fails, it might mean the record doesn't exist, so we continue
			console.log('🔍 El post de ejemplo no existe, creando...');
		}
		
		// Crear post de ejemplo
		try {
			await db.query(`
				CREATE user:admin SET
					name = "Arawi Aura",
					slug = "arawi-aura",
					email = "admin@arawiaura.com",
					password_hash = "",
					bio = "Creador de contenido y desarrollador",
					created_at = time::now();
			`);
		} catch (error) {
			console.log("⚠️  Usuario admin ya existe, continuando...");
		}

		await db.query(`
			CREATE post:ejemplo SET
				title = "¡Bienvenido a Arawi Aura!",
				slug = "bienvenido-arawi-aura",
				content = "# ¡Hola mundo!

Este es tu primer post en **Arawi Aura**, un blog minimalista construido con SvelteKit y SurrealDB.

## Características

- ✅ **SvelteKit** - Framework moderno y rápido
- ✅ **SurrealDB** - Base de datos graph+document
- ✅ **TypeScript** - Tipado estático
- ✅ **Responsive** - Diseño adaptable

## Próximos pasos

1. Edita este post desde el admin
2. Crea nuevos posts
3. Personaliza el diseño
4. ¡Comparte tu contenido!

¡Feliz blogging! 🎉",
				html = "<h1>¡Hola mundo!</h1><p>Este es tu primer post en <strong>Arawi Aura</strong>...</p>",
				excerpt = "Tu primer post de bienvenida en Arawi Aura. Descubre las características y próximos pasos.",
				status = "published",
				published_at = time::now(),
				created_at = time::now(),
				updated_at = time::now(),
				author = user:admin,
				tags = [tag:tecnologia, tag:sveltekit];
		`);
		
		console.log('✅ Datos de desarrollo creados');
		
	} catch (error) {
		console.error('❌ Error creando datos de desarrollo:', error);
		throw error;
	} finally {
		await db.close();
	}
}

/**
 * Verifica la conexión a la base de datos
 */
export async function checkConnection(): Promise<boolean> {
	try {
		const db = await connectForSeed();
		await db.query('INFO FOR DB;');
		await db.close();
		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Inicialización completa de la base de datos
 */
export async function initializeDatabase(): Promise<void> {
	console.log('🔍 Verificando conexión a SurrealDB Cloud...');
	
	const isConnected = await checkConnection();
	
	if (!isConnected) {
		console.error('❌ No se puede conectar a SurrealDB Cloud');
		console.log('💡 Verifica las variables de entorno en .env');
		throw new Error('No se puede conectar a la base de datos');
	}
	
	console.log('✅ SurrealDB Cloud está disponible');
	
	// Ejecutar esquema
	await runSchema();
	
	// Crear datos de desarrollo
	await seedDevelopmentData();
	
	console.log('🎉 ¡Base de datos inicializada correctamente!');
	console.log('');
	console.log('Ahora puedes ejecutar: pnpm dev');
}