/**
 * Funciones para inicializar y poblar la base de datos
 * Siguiendo las convenciones de SvelteKit
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { Surreal } from 'surrealdb';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

// Configuración desde variables de entorno
const DB_URL = process.env.SURREALDB_URL!;
const DB_USERNAME = process.env.SURREALDB_USERNAME!;
const DB_PASSWORD = process.env.SURREALDB_PASSWORD!;
const DB_NAMESPACE = process.env.SURREALDB_NAMESPACE!;
const DB_DATABASE = process.env.SURREALDB_DATABASE!;

/**
 * Conecta a la base de datos para operaciones de seed
 */
async function connectForSeed(): Promise<Surreal> {
	const db = new Surreal();
	
	await db.connect(DB_URL, {
		namespace: DB_NAMESPACE,
		database: DB_DATABASE
	});
	
	await db.signin({
		username: DB_USERNAME,
		password: DB_PASSWORD
	});
	
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
		
		// Verificar si ya existen posts
		const existingPosts = await db.query('SELECT * FROM post LIMIT 1;');
		if ((existingPosts[0] as any)?.result?.length > 0) {
			console.log('📊 Ya existen datos, omitiendo seed de desarrollo');
			return;
		}
		
		// Crear post de ejemplo
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