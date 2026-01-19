# Arawi Aura

> Un blog minimalista construido con SvelteKit y SurrealDB

## 📋 Visión General

**Arawi Aura** es un sistema de blogging minimalista y moderno que combina la potencia de SvelteKit con la flexibilidad de SurrealDB. Diseñado con filosofía "mobile-first" y estructura arquitectónica limpia.

### ✨ Características

- ⚡ **SvelteKit** - Framework ultra-rápido y moderno
- 🗄️ **SurrealDB** - Base de datos graph+document nativa en la nube
- 🎯 **TypeScript** - Tipado estático para desarrollo robusto
- 📱 **Mobile-First** - Diseño responsive adaptativo
- 🎨 **Diseño Minimalista** - Arquitectura visual limpia y funcional
- 🏷️ **Gestión de Etiquetas** - Sistema de categorización flexible
- 👥 **Gestión de Usuarios** - Autenticación y perfiles
- 📁 **Media Assets** - Gestión de imágenes y archivos

## 🗂️ Estructura de Datos

El sistema almacena información en estas tablas principales:

### Posts (`post`)

```javascript
{
  id: "post:ejemplo",
  title: "¡Bienvenido a Arawi Aura!",
  slug: "bienvenido-arawi-aura",
  content: "...",
  html: "...",
  excerpt: "Tu primer post de bienvenida...",
  status: "published",
  author: user:admin,
  tags: [tag:tecnologia, tag:sveltekit],
  created_at: "2026-01-13T14:31:24.039486210Z",
  updated_at: "2026-01-13T14:31:24.039487933Z"
}
```

### Etiquetas (`tag`)

```javascript
{
  id: "tag:tecnologia",
  name: "tecnologia",
  slug: "tecnologia"
}
```

### Usuarios (`user`)

```javascript
{
  id: "user:admin",
  email: "admin@example.com",
  name: "Admin User",
  // password: encriptado con crypto::argon2
}
```

### Assets (`asset`)

- Gestión de imágenes y archivos multimedia

### Settings (`setting`)

- Configuración del blog

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- Acceso a SurrealDB Cloud

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd arawi-aura

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
```

### Configuración de Base de Datos

Conecta a SurrealDB usando las credenciales proporcionadas:

```bash
surreal sql \
  --endpoint "wss://arawi-aura-06dociqo7du3tf9lipjvgi6g50.aws-use1.surreal.cloud" \
  --namespace "poetry" \
  --auth-level "database" \
  --username "arawi_user" \
  --password "4ur4_p455"
```

### Desarrollo

```bash
# Inicializar base de datos
pnpm db:init

# Iniciar servidor de desarrollo
pnpm dev

# Visita http://localhost:5173
```

## 🏗️ Arquitectura de Componentes

### Componentes Principales

#### **Input** (`src/lib/components/Input.svelte`)

- ✅ Toggle de contraseña con íconos Carbon/Iconify
- ✅ Anillo mobile-first sin hover
- ✅ Estados mejorados con multi-layer shadows
- ✅ Props agnósticos: `pattern`, `minlength`, `maxlength`

#### **Card** (`src/lib/components/Card.svelte`)

- ✅ Slots no convencionales: `top`, `body`, `footer`
- ✅ Sin efectos hover
- ✅ CSS optimizado (~330 líneas eliminadas)

#### **AdminLayout** (`src/lib/components/AdminLayout.svelte`)

- ✅ Mobile-first sin soporte tablet colapsado
- ✅ Z-index jerárquico: overlay(998), sidebar(999), header(996)
- ✅ Info del usuario en header desktop
- ✅ Estado activo en navegación con `activeHref` prop

### Sistema de Tipos

Todos los tipos centralizados en `src/lib/types/Admin.ts`:

```typescript
export interface NavItem {
	label: string;
	href: string;
	icon: string;
	badge?: string | number;
}

export interface AdminLayoutProps {
	navItems?: NavItem[];
	title?: string;
	user?: UserInfo;
	children: Snippet;
	activeHref?: string; // Para controlar estado activo manualmente
}
```

## 📱 Responsive Design

### Mobile (< 641px)

- Sidebar oculto con menú hamburguesa
- User info en sidebar móvil
- Mobile actions (View Site, Logout) en sidebar

### Desktop (≥ 641px)

- Sidebar completo siempre visible
- User info en header entre botones
- Sin menú hamburguesa

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm build            # Build para producción
pnpm preview          # Preview del build

# Base de datos
pnpm db:init          # Inicializar esquema (CLI)
pnpm db:seed          # Solo crear datos de ejemplo

# Calidad
pnpm check            # Verificación TypeScript y Svelte
pnpm lint             # Linting del código
pnpm format           # Formateo con Prettier

# Storybook
pnpm storybook        # Abrir Storybook
pnpm build-storybook  # Build estático de Storybook
```

## 🌐 Despliegue

### Variables de Entorno

```env
PUBLIC_SURREAL_ENDPOINT="wss://your-cluster.surreal.cloud"
PUBLIC_SURREAL_NAMESPACE="your-namespace"
PUBLIC_SURREAL_DATABASE="your-database"
SURREAL_USERNAME="your-username"
SURREAL_PASSWORD="your-password"
```

### Construcción

```bash
pnpm build
# Listo para deploy en Vercel, Netlify, Railway, etc.
```

## 📊 Estado Actual del Sistema

- **Posts**: 1 registro activo ("¡Bienvenido a Arawi Aura!")
- **Usuarios**: 1 administrador
- **Etiquetas**: 2 (tecnología, sveltekit)
- **Assets**: 0 archivos
- **Settings**: 4 configuraciones

## 📁 Estructura del Proyecto

```
src/
├── lib/
│   ├── components/          # Componentes UI
│   │   ├── Input.svelte     # Input con password toggle
│   │   ├── Card.svelte      # Card con slots personalizados
│   │   └── AdminLayout.svelte # Layout administrativo
│   ├── types/
│   │   └── Admin.ts         # Tipos centralizados
│   └── db/
│       ├── index.ts          # Barrel exports
│       ├── connection.ts     # Conexión a SurrealDB
│       ├── queries.ts        # Consultas de datos
│       ├── types.ts          # Tipos de DB
│       ├── seed.ts           # Funciones de inicialización
│       └── schema.surql      # Esquema SQL
├── routes/
│   ├── api/db/              # API endpoints para DB
│   ├── admin/               # Panel de administración
│   ├── post/[slug]/         # Posts individuales
│   └── tag/[slug]/          # Posts por tag
├── stories/
│   └── Admin.stories.svelte # Storybook stories
└── scripts/
    └── init-db.ts           # Script CLI de inicialización
```

## 🔧 Tecnologías

- **Frontend**: SvelteKit 2.x + TypeScript
- **Base de datos**: SurrealDB Cloud
- **Estilos**: CSS nativo con variables CSS
- **Iconos**: Iconify con conjunto Carbon
- **Deployment**: Vercel/Netlify ready

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commitear cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 🙏 Agradecimientos

- **Svelte** - Framework web reactivos
- **SurrealDB** - Base de datos next-gen
- **Iconify** - Sistema de íconos unificado
- **Vite** - Herramienta de build ultrarrápida

---

**Arawi Aura** - Minimalismo con propósito 🎯
