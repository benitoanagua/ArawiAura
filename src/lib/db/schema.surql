-- ============================================
-- ARAWI AURA BLOG - SURREALDB SCHEMA
-- ============================================

-- 1. USERS (Autores del blog)
DEFINE TABLE user SCHEMAFULL;
DEFINE FIELD name ON user TYPE string;
DEFINE FIELD slug ON user TYPE string;
DEFINE FIELD email ON user TYPE string;
DEFINE FIELD password_hash ON user TYPE string;
DEFINE FIELD bio ON user TYPE string;
DEFINE FIELD profile_image ON user TYPE option<record(asset)>;
DEFINE FIELD created_at ON user TYPE datetime DEFAULT time::now();

-- Índices para users
DEFINE INDEX user_slug_idx ON user FIELDS slug UNIQUE;
DEFINE INDEX user_email_idx ON user FIELDS email UNIQUE;

-- 2. POSTS (Core del blog)
DEFINE TABLE post SCHEMAFULL;
DEFINE FIELD title ON post TYPE string;
DEFINE FIELD slug ON post TYPE string;
DEFINE FIELD content ON post TYPE string;        -- Markdown
DEFINE FIELD html ON post TYPE string;           -- Cache renderizado
DEFINE FIELD excerpt ON post TYPE option<string>;
DEFINE FIELD feature_image ON post TYPE option<record(asset)>;
DEFINE FIELD status ON post TYPE string ASSERT $value INSIDE ['draft','published'];
DEFINE FIELD published_at ON post TYPE option<datetime>;
DEFINE FIELD created_at ON post TYPE datetime DEFAULT time::now();
DEFINE FIELD updated_at ON post TYPE datetime DEFAULT time::now();
DEFINE FIELD author ON post TYPE record(user);
DEFINE FIELD tags ON post TYPE array<record(tag)>;

-- Índices para posts
DEFINE INDEX post_slug_idx ON post FIELDS slug UNIQUE;
DEFINE INDEX post_status_idx ON post FIELDS status;
DEFINE INDEX post_published_idx ON post FIELDS published_at;

-- 3. TAGS
DEFINE TABLE tag SCHEMAFULL;
DEFINE FIELD name ON tag TYPE string;
DEFINE FIELD slug ON tag TYPE string;
DEFINE FIELD description ON tag TYPE option<string>;
DEFINE FIELD color ON tag TYPE option<string>;
DEFINE FIELD created_at ON tag TYPE datetime DEFAULT time::now();

-- Índices para tags
DEFINE INDEX tag_slug_idx ON tag FIELDS slug UNIQUE;
DEFINE INDEX tag_name_idx ON tag FIELDS name UNIQUE;

-- 4. ASSETS (Imágenes y archivos)
DEFINE TABLE asset SCHEMAFULL;
DEFINE FIELD url ON asset TYPE string;
DEFINE FIELD alt ON asset TYPE option<string>;
DEFINE FIELD width ON asset TYPE option<number>;
DEFINE FIELD height ON asset TYPE option<number>;
DEFINE FIELD size ON asset TYPE option<number>;
DEFINE FIELD mime_type ON asset TYPE option<string>;
DEFINE FIELD created_at ON asset TYPE datetime DEFAULT time::now();

-- 5. SETTINGS (Configuración global del sitio)
DEFINE TABLE setting SCHEMALESS;

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Usuario por defecto
CREATE user:admin SET
    name = 'Arawi Aura',
    slug = 'arawi-aura',
    email = 'admin@arawiaura.com',
    password_hash = '',
    bio = 'Creador de contenido y desarrollador',
    created_at = time::now();

-- Settings iniciales del sitio
CREATE setting:site_title SET value = 'Arawi Aura';
CREATE setting:site_description SET value = 'Blog personal de tecnología y desarrollo';
CREATE setting:site_url SET value = 'https://arawiaura.com';
CREATE setting:posts_per_page SET value = 10;
CREATE setting:theme SET value = 'default';

-- Tags iniciales
CREATE tag:tecnologia SET
    name = 'Tecnología',
    slug = 'tecnologia',
    description = 'Posts sobre tecnología y desarrollo',
    color = '#3b82f6';

CREATE tag:sveltekit SET
    name = 'SvelteKit',
    slug = 'sveltekit',
    description = 'Tutoriales y tips sobre SvelteKit',
    color = '#ff3e00';

CREATE tag:surrealdb SET
    name = 'SurrealDB',
    slug = 'surrealdb',
    description = 'Base de datos moderna y flexible',
    color = '#ff00a0';