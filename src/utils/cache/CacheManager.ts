interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheItem<any>> = new Map();

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > item.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  getSize(): number {
    return this.cache.size;
  }

  // Nuevo método: Invalidar cache por patrón
  invalidateByPattern(pattern: string | RegExp): number {
    const keysToDelete: string[] = [];

    // Obtener todas las keys del cache
    const keys = Array.from(this.cache.keys());

    // Filtrar keys que coincidan con el patrón
    for (const key of keys) {
      if (typeof pattern === "string") {
        if (key.includes(pattern)) {
          keysToDelete.push(key);
        }
      } else {
        // Es un RegExp
        if (pattern.test(key)) {
          keysToDelete.push(key);
        }
      }
    }

    // Eliminar las keys que coinciden
    keysToDelete.forEach((key) => this.cache.delete(key));

    return keysToDelete.length;
  }

  // Nuevo método: Obtener todas las keys (útil para debugging)
  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  // Nuevo método: Obtener estadísticas del cache
  getStats(): {
    totalItems: number;
    expiredItems: number;
    memoryUsage: string;
  } {
    const keys = Array.from(this.cache.keys());
    let expiredCount = 0;
    const now = Date.now();

    for (const key of keys) {
      const item = this.cache.get(key);
      if (item && now - item.timestamp > item.ttl) {
        expiredCount++;
      }
    }

    // Estimación aproximada del uso de memoria
    let totalSize = 0;
    try {
      totalSize = new TextEncoder().encode(
        JSON.stringify(Array.from(this.cache.entries()))
      ).length;
    } catch (error) {
      // Fallback si JSON.stringify falla
      totalSize = this.cache.size * 1000; // Estimación aproximada
    }

    return {
      totalItems: this.cache.size,
      expiredItems: expiredCount,
      memoryUsage: this.formatBytes(totalSize),
    };
  }

  // Helper para formatear bytes
  private formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // Nuevo método: Limpiar items expirados
  cleanupExpired(): number {
    const keys = Array.from(this.cache.keys());
    const now = Date.now();
    let removedCount = 0;

    for (const key of keys) {
      const item = this.cache.get(key);
      if (item && now - item.timestamp > item.ttl) {
        this.cache.delete(key);
        removedCount++;
      }
    }

    return removedCount;
  }
}

// Singleton export
export const cacheManager = CacheManager.getInstance();
