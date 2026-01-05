# Arawi Aura

Blog minimalista construido con **SvelteKit** y **SurrealDB Cloud**.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de SurrealDB Cloud:

```env
SURREALDB_URL=wss://your-instance.surreal.cloud
SURREALDB_USERNAME=your_username
SURREALDB_PASSWORD=your_password
SURREALDB_NAMESPACE=your_namespace
SURREALDB_DATABASE=your_database
```

### 3. Inicializar la base de datos

**Opción A: Desde la línea de comandos**
```bash
pnpm db:init
```

**Opción B: Desde la interfaz web**
```bash
pnpm dev
# Luego visita http://localhost:5173/admin
```

### 4. Iniciar el proyecto

```bash
pnpm dev
```

## 📚 Documentación

Ver [README-SURREALDB.md](./README-SURREALDB.md) para documentación completa.

## ✨ Características

- ✅ **SurrealDB Cloud** - Base de datos moderna graph+document en la nube
- ✅ **SvelteKit** - Framework web rápido y moderno
- ✅ **TypeScript** - Tipado estático completo
- ✅ **Variables de entorno** - Configuración segura
- ✅ **API Routes** - Endpoints para administración
- ✅ **Seed/Migration** - Inicialización de datos siguiendo convenciones
- ✅ **Responsive** - Diseño adaptable
- ✅ **SEO optimizado** - Meta tags y Open Graph
- ✅ **Sin tablas intermedias** - Relaciones directas
- ✅ **Schema flexible** - Evoluciona con tu proyecto

## 🗄️ Esquema

```
user (autores)
post (artículos) → author: user, tags: array<tag>
tag (etiquetas)
asset (imágenes)
setting (configuración)
```

## 🛠️ Comandos

```bash
pnpm dev          # Desarrollo
pnpm build        # Build para producción
pnpm preview      # Preview del build
pnpm db:init      # Inicializar esquema (CLI)
pnpm db:seed      # Solo crear datos de ejemplo
```

## 📁 Estructura del Proyecto

```
src/
├── lib/
│   └── db/
│       ├── index.ts          # Barrel exports
│       ├── connection.ts     # Conexión a SurrealDB
│       ├── queries.ts        # Consultas de datos
│       ├── types.ts          # Tipos TypeScript
│       ├── seed.ts           # Funciones de inicialización
│       └── schema.surql      # Esquema SQL
├── routes/
│   ├── api/db/              # API endpoints para DB
│   ├── admin/               # Panel de administración
│   ├── post/[slug]/         # Posts individuales
│   └── tag/[slug]/          # Posts por tag
└── scripts/
    └── init-db.ts           # Script CLI de inicialización
```

## 🔧 Tecnologías

- **Frontend**: SvelteKit 2.x + TypeScript
- **Base de datos**: SurrealDB Cloud
- **Estilos**: CSS nativo con variables
- **Deployment**: Vercel/Netlify ready