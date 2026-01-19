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

## Comandos y Utilidades SurrealDB

> Guía de comandos frecuentes para gestionar Arawi Aura con SurrealDB

## 🚀 Conexión

### Conectar a la base de datos

```bash
surreal sql \
  --endpoint "wss://arawi-aura-06dociqo7du3tf9lipjvgi6g50.aws-use1.surreal.cloud" \
  --namespace "poetry" \
  --auth-level "database" \
  --username "arawi_user" \
  --password "4ur4_p455"
```

### Conexión rápida (alias)

```bash
# Agregar a ~/.bashrc o ~/.zshrc
alias arawi-db='surreal sql --endpoint "wss://arawi-aura-06dociqo7du3tf9lipjvgi6g50.aws-use1.surreal.cloud" --namespace "poetry" --auth-level "database" --username "arawi_user" --password "4ur4_p455"'

# Usar:
arawi-db
```

## 📊 Consultas Básicas

### Información general

```sql
-- Información de la base de datos
INFO FOR DB;

-- Ver todas las tablas
INFO FOR TABLE;

-- Estadísticas de la base de datos
SELECT * FROM $metrics;
```

### Contar registros

```sql
-- Contar todos los registros en cada tabla
SELECT count() FROM asset GROUP ALL;
SELECT count() FROM post GROUP ALL;
SELECT count() FROM setting GROUP ALL;
SELECT count() FROM tag GROUP ALL;
SELECT count() FROM user GROUP ALL;

-- Contar con alias más claros
SELECT
  "asset" AS table_name, count() FROM asset GROUP ALL
UNION
SELECT
  "post" AS table_name, count() FROM post GROUP ALL
UNION
SELECT
  "tag" AS table_name, count() FROM tag GROUP ALL
UNION
SELECT
  "user" AS table_name, count() FROM user GROUP ALL
UNION
SELECT
  "setting" AS table_name, count() FROM setting GROUP ALL;
```

## 👥 Gestión de Usuarios

### Ver usuarios

```sql
-- Ver información básica de usuarios (sin passwords)
SELECT id, email, name, created_at FROM user;

-- Ver usuario específico
SELECT * FROM user WHERE email = 'admin@example.com';

-- Ver usuarios con sus posts
SELECT
  id,
  email,
  name,
  (SELECT count() FROM post WHERE author = $parent.id) AS posts_count
FROM user;
```

### Crear usuarios

```sql
-- Crear nuevo usuario
CREATE user SET
  email = 'nuevo@example.com',
  name = 'Nuevo Usuario',
  password = crypto::argon2::generate('password_seguro123');

-- Crear usuario admin
CREATE user SET
  email = 'admin2@example.com',
  name = 'Admin Secundario',
  password = crypto::argon2::generate('admin_password_123'),
  role = 'admin';
```

### Actualizar usuarios

```sql
-- Cambiar contraseña
UPDATE user SET
  password = crypto::argon2::generate('nueva_password_456')
WHERE email = 'admin@example.com';

-- Actualizar información
UPDATE user SET
  name = 'Nombre Actualizado',
  email = 'nuevo_email@example.com'
WHERE id = user:admin;
```

## 📝 Gestión de Posts

### Ver posts

```sql
-- Todos los posts con autor
SELECT
  id,
  title,
  slug,
  status,
  excerpt,
  created_at,
  updated_at,
  author.name AS author_name,
  author.email AS author_email
FROM post;

-- Posts publicados
SELECT * FROM post WHERE status = 'published' ORDER BY created_at DESC;

-- Posts por autor
SELECT * FROM post WHERE author = user:admin;

-- Posts con etiquetas
SELECT
  id,
  title,
  tags,
  (SELECT id, name FROM $tags) AS tag_details
FROM post;

-- Posts recientes
SELECT * FROM post
WHERE status = 'published'
ORDER BY created_at DESC
LIMIT 5;
```

### Crear posts

```sql
-- Crear post básico
CREATE post SET
  title = 'Mi Nuevo Post',
  slug = 'mi-nuevo-post',
  content = '# Mi Nuevo Post\n\nEste es el contenido del post.',
  html = '<h1>Mi Nuevo Post</h1><p>Este es el contenido del post.</p>',
  excerpt = 'Breve descripción del post...',
  status = 'draft',
  author = user:admin;

-- Crear post con etiquetas existentes
CREATE post SET
  title = 'Post con Etiquetas',
  slug = 'post-con-etiquetas',
  content = '# Post con Etiquetas\n\nContenido interesante...',
  html = '<h1>Post con Etiquetas</h1><p>Contenido interesante...</p>',
  excerpt = 'Post sobre tecnología y desarrollo',
  status = 'published',
  author = user:admin,
  tags = [tag:tecnologia, tag:sveltekit];

-- Crear post con fecha específica
CREATE post SET
  title = 'Post Programado',
  slug = 'post-programado',
  content = 'Contenido...',
  status = 'published',
  author = user:admin,
  created_at = time::now(),
  published_at = time::now();
```

### Actualizar posts

```sql
-- Actualizar contenido
UPDATE post SET
  content = '# Título Actualizado\n\nContenido modificado...',
  html = '<h1>Título Actualizado</h1><p>Contenido modificado...</p>',
  updated_at = time::now()
WHERE slug = 'mi-nuevo-post';

-- Publicar post
UPDATE post SET
  status = 'published',
  published_at = time::now()
WHERE id = post:mi-nuevo-post;

-- Agregar etiquetas
UPDATE post SET
  tags = array::append(tags, tag:javascript)
WHERE id = post:mi-nuevo-post;

-- Cambiar autor
UPDATE post SET
  author = user:nuevo_usuario
WHERE id = post:mi-nuevo-post;
```

## 🏷️ Gestión de Etiquetas

### Ver etiquetas

```sql
-- Todas las etiquetas
SELECT * FROM tag ORDER BY name;

-- Etiquetas con conteo de posts
SELECT
  id,
  name,
  slug,
  (SELECT count() FROM post WHERE $id IN tags) AS posts_count
FROM tag;

-- Etiquetas populares
SELECT
  id,
  name,
  slug,
  (SELECT count() FROM post WHERE $id IN tags) AS posts_count
FROM tag
WHERE (SELECT count() FROM post WHERE $id IN tags) > 0
ORDER BY posts_count DESC;
```

### Crear etiquetas

```sql
-- Crear etiqueta individual
CREATE tag SET
  name = 'JavaScript',
  slug = 'javascript';

-- Crear múltiples etiquetas
CREATE tag SET name = 'React', slug = 'react';
CREATE tag SET name = 'Vue', slug = 'vue';
CREATE tag SET name = 'CSS', slug = 'css';
```

### Relacionar posts con etiquetas

```sql
-- Agregar etiqueta a post existente
UPDATE post SET
  tags = array::append(tags, tag:javascript)
WHERE id = post:ejemplo;

-- Establecer todas las etiquetas
UPDATE post SET
  tags = [tag:tecnologia, tag:javascript, tag:react]
WHERE id = post:ejemplo;

-- Quitar etiqueta
UPDATE post SET
  tags = array::remove(tags, tag:vue)
WHERE id = post:ejemplo;
```

## 🖼️ Gestión de Assets

### Ver assets

```sql
-- Todos los assets
SELECT * FROM asset;

-- Assets por tipo
SELECT * FROM asset WHERE type = 'image';
SELECT * FROM asset WHERE type = 'file';

-- Assets recientes
SELECT * FROM asset ORDER BY created_at DESC LIMIT 10;
```

### Crear assets

```sql
-- Crear asset de imagen
CREATE asset SET
  filename = 'imagen-ejemplo.jpg',
  type = 'image',
  size = 1024000,
  url = 'https://example.com/imagen-ejemplo.jpg',
  alt = 'Descripción de la imagen',
  caption = 'Pie de foto descriptivo';

-- Asset de documento
CREATE asset SET
  filename = 'documento.pdf',
  type = 'file',
  size = 2048000,
  url = 'https://example.com/documento.pdf',
  mime_type = 'application/pdf';
```

## ⚙️ Gestión de Settings

### Ver configuraciones

```sql
-- Todas las configuraciones
SELECT * FROM setting;

-- Configuración específica
SELECT * FROM setting WHERE key = 'site_title';

-- Configuraciones públicas
SELECT * FROM setting WHERE public = true;
```

### Actualizar configuraciones

```sql
-- Actualizar título del sitio
UPDATE setting SET
  value = 'Mi Blog Personal'
WHERE key = 'site_title';

-- Actualizar descripción
UPDATE setting SET
  value = 'Blog sobre tecnología y desarrollo web'
WHERE key = 'site_description';

-- Crear nueva configuración
CREATE setting SET
  key = 'contact_email',
  value = 'contacto@miweb.com',
  public = true;
```

## 🔍 Búsquedas Avanzadas

### Buscar posts

```sql
-- Buscar por título
SELECT * FROM post WHERE title CONTAINS 'svelte';

-- Buscar por contenido
SELECT * FROM post WHERE content CONTAINS 'javascript';

-- Buscar posts con etiqueta específica
SELECT * FROM post WHERE tag:tecnologia IN tags;

-- Búsqueda full-text compleja
SELECT
  id,
  title,
  excerpt,
  author.name AS author_name
FROM post
WHERE title CONTAINS 'svelte'
   OR content CONTAINS 'svelte'
   OR tag:tecnologia IN tags
ORDER BY created_at DESC;

-- Posts por rango de fechas
SELECT * FROM post
WHERE created_at >= '2026-01-01'
  AND created_at <= '2026-12-31'
ORDER BY created_at DESC;
```

### Consultas de relaciones

```sql
-- Posts con todas sus etiquetas
SELECT
  id,
  title,
  (SELECT id, name, slug FROM $tags) AS tags
FROM post;

-- Posts por autor con conteo de etiquetas
SELECT
  id,
  title,
  author.name AS author_name,
  array::len(tags) AS tags_count
FROM post
WHERE status = 'published';

-- Etiquetas con posts relacionados
SELECT
  id,
  name,
  (SELECT id, title, slug FROM post WHERE $parent.id IN tags) AS posts
FROM tag;
```

## 🛠️ Operaciones de Mantenimiento

### Backup y Restore

```sql
-- Exportar todos los datos
USE poetry/blog;
SELECT * FROM post;
SELECT * FROM user;
SELECT * FROM tag;
SELECT * FROM asset;
SELECT * FROM setting;

-- Guardar resultados en archivo
COPY (
  SELECT id, title, slug, content, html, excerpt, status, author, tags, created_at, updated_at, published_at FROM post
) TO '/path/to/backup/posts.json';
```

### Limpieza y Optimización

```sql
-- Eliminar posts draft antiguos
DELETE FROM post
WHERE status = 'draft'
  AND created_at < time::now() - 30d;

-- Eliminar etiquetas sin posts
DELETE FROM tag
WHERE id NOT IN (SELECT array::flatten(tags) FROM post);

-- Optimizar índices
OPTIMIZE TABLE post;
OPTIMIZE TABLE user;
OPTIMIZE TABLE tag;
```

## 🔗 Scripts Útiles

### Script para estadísticas rápidas

```sql
-- Vista general del blog
SELECT
  'Posts' AS metric,
  (SELECT count() FROM post) AS total,
  (SELECT count() FROM post WHERE status = 'published') AS published,
  (SELECT count() FROM post WHERE status = 'draft') AS draft
UNION
SELECT
  'Users' AS metric,
  (SELECT count() FROM user) AS total,
  (SELECT count() FROM user WHERE role = 'admin') AS admins,
  (SELECT count() FROM user WHERE role != 'admin') AS regular
UNION
SELECT
  'Tags' AS metric,
  (SELECT count() FROM tag) AS total,
  NULL AS published,
  NULL AS draft;

-- Posts recientes con autor
SELECT
  title,
  slug,
  status,
  author.name AS author,
  created_at
FROM post
ORDER BY created_at DESC
LIMIT 5;

-- Etiquetas más populares
SELECT
  name,
  (SELECT count() FROM post WHERE $id IN tags) AS usage_count
FROM tag
ORDER BY usage_count DESC
LIMIT 10;
```

### Script para migración

```sql
-- Actualizar todos los posts para tener excerpt si no lo tienen
UPDATE post SET
  excerpt = string::slice(string::replace(html, '<[^>]*>', ''), 0, 200) + '...'
WHERE excerpt = NONE;

-- Generar slugs automáticamente
UPDATE post SET
  slug = string::lowercase(string::replace(title, ' ', '-'))
WHERE slug = NONE;

-- Actualizar timestamps
UPDATE post SET
  updated_at = time::now()
WHERE updated_at = NONE;
```

## 📱 Consultas para la API

### Endpoint-ready queries

```sql
-- API: Get all published posts
SELECT
  id,
  title,
  slug,
  excerpt,
  author.name AS author_name,
  author.email AS author_email,
  created_at,
  tags
FROM post
WHERE status = 'published'
ORDER BY created_at DESC;

-- API: Get post by slug
SELECT
  id,
  title,
  slug,
  content,
  html,
  author.name AS author_name,
  author.email AS author_email,
  created_at,
  updated_at,
  tags
FROM post
WHERE slug = $slug AND status = 'published';

-- API: Get posts by tag
SELECT
  id,
  title,
  slug,
  excerpt,
  author.name AS author_name,
  created_at
FROM post
WHERE $tag_id IN tags AND status = 'published'
ORDER BY created_at DESC;
```

## 🛡️ Seguridad

### Operaciones seguras

```sql
-- Ver usuarios sin contraseña hasheada
SELECT id, email FROM user WHERE password NOT LIKE '%$%';

-- Forzar cambio de contraseña
UPDATE user SET
  password = crypto::argon2::generate('temp_password_123'),
  must_change_password = true
WHERE id = user:admin;

-- Auditoría de cambios
SELECT
  id,
  email,
  created_at,
  updated_at
FROM user
ORDER BY updated_at DESC;
```

---

**Tip**: Guarda estos comandos en scripts `.sql` o en tu shell para acceso rápido. Considera crear un archivo `arawi-queries.sql` con las consultas más usadas.
