import { cacheManager } from "./CacheManager";

export class CacheDebugger {
  static logCacheContents(): void {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    const keys = cacheManager.getKeys();
    const stats = cacheManager.getStats();

    console.group("📦 Cache Debug Info");
    console.log("Total items:", stats.totalItems);
    console.log("Expired items:", stats.expiredItems);
    console.log("Memory usage:", stats.memoryUsage);
    console.log("Keys:", keys);
    console.groupEnd();
  }

  static clearAllCache(): void {
    const beforeSize = cacheManager.getSize();
    cacheManager.clear();
    console.log(`🧹 Cache cleared: ${beforeSize} items removed`);
  }
}
