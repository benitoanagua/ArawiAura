# Arawi Aura - Blog con SurrealDB

## 🚀 Configuración del Proyecto

Este blog está construido con **SvelteKit** y **SurrealDB**, siguiendo un enfoque minimalista y moderno.

### Arquitectura

```
src/
├── lib/
│   ├── db/
│   │   ├── schema.surql      # Esquema de la base de datos
│   │   ├── connection.ts     # Conexión a SurrealDB
│   │   ├── queries.ts        # Consultas principales
│   │   └── types.ts          # Tipos TypeScript
│   └── utils/
│       └── markdown.ts       # Utilidades para Markdown
└── routes/
    ├── +layout.server.ts     # Configuración global
    ├── +page.server.ts       # Homepage
    ├── +page.svelte          # Homepage UI
    ├── post/[slug]/          # Posts individuales
    └── tag/[slug]/           # Posts por tag
```

## 🗄️ Esquema de Base de Datos

### Entidades Principales

1. **user** - Autores del blog
2. **post** - Artículos del blog
3. **tag** - Etiquetas/categorías
4. **asset** - Imágenes y archivos
5. **setting** - Configuración del sitio

### Características Clave

✅ **Sin tablas intermedias** - SurrealDB maneja relaciones directamente
✅ **Arrays de referencias** - `post.tags` es un array de `record(tag)`
✅ **Schema flexible** - Algunos campos opcionales
✅ **Índices optimizados** - Para búsquedas rápidas

## 🛠️ Instalación y Configuración

### 1. Instalar SurrealDB

```bash
# macOS/Linux
curl -sSf https://install.surrealdb.com | sh

# Windows
iwr https://install.surrealdb.com -useb | iex
```

### 2. Instalar dependencias del proyecto

```bash
pnpm install
```

### 3. Iniciar SurrealDB

```bash
surreal start --log trace --user root --pass root memory
```

### 4. Cargar el esquema

```bash
surreal sql --conn http://localhost:8000 --user root --pass root --ns arawi_aura --db blog --file src/lib/db/schema.surql
```

### 5. Iniciar el proyecto

```bash
pnpm dev
```

## 📝 Uso Básico

### Crear un Post

```typescript
import { createPost } from '$lib/db/queries.js';

const newPost = await createPost({
  title: 'Mi Primer Post',
  slug: 'mi-primer-post',
  content: '# Hola Mundo\n\nEste es mi primer post.',
  status: 'published',
  author: 'user:admin',
  tags: ['tag:tecnologia', 'tag:sveltekit']
});
```

### Consultas Típicas

```sql
-- Posts publicados con autor y tags
SELECT *, author.*, tags.*
FROM post
WHERE status = 'published'
ORDER BY published_at DESC
FETCH author, tags;

-- Posts por tag
SELECT *
FROM post
WHERE status = 'published' 
AND tags[*].slug CONTAINS 'sveltekit'
FETCH author, tags;
```

## 🎨 Personalización

### Configuración del Sitio

Edita los settings en `src/lib/db/schema.surql`:

```sql
CREATE setting:site_title SET value = 'Tu Blog';
CREATE setting:site_description SET value = 'Descripción de tu blog';
```

### Estilos

Los estilos están en cada componente Svelte. Puedes:

1. Modificar las variables CSS
2. Cambiar los colores de los tags
3. Ajustar el layout responsive

## 🚀 Despliegue

### Producción

1. **SurrealDB Cloud** o servidor propio
2. **Vercel/Netlify** para el frontend
3. Variables de entorno para la conexión

### Variables de Entorno

```env
SURREALDB_URL=wss://your-db-url/rpc
SURREALDB_USER=your-user
SURREALDB_PASS=your-password
SURREALDB_NS=arawi_aura
SURREALDB_DB=blog
```

## 📊 Ventajas de SurrealDB

✅ **Graph + Document** - Lo mejor de ambos mundos
✅ **Sin ORMs** - Consultas SQL directas
✅ **Relaciones simples** - Sin tablas intermedias
✅ **Schema flexible** - Evoluciona con tu proyecto
✅ **Tiempo real** - WebSocket nativo
✅ **Escalable** - Desde desarrollo hasta producción

## 🔧 Comandos Útiles

```bash
# Desarrollo
pnpm dev

# Build
pnpm build

# Preview
pnpm preview

# Linting
pnpm lint

# Formateo
pnpm format
```

## 📚 Recursos

- [SurrealDB Docs](https://surrealdb.com/docs)
- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [SurrealDB.js](https://github.com/surrealdb/surrealdb.js)

---

**¡Tu blog minimalista está listo! 🎉**