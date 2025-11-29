interface CacheEntry {
  url: string;
  data: any;
  hash?: string;
  etag?: string;
  updatedAt: number;
  expiresAt: number;
}

class CacheManager {
  private static instance: CacheManager;
  private readonly CACHE_KEY = 'app-cache-v1.0.0';
  private readonly MAX_ENTRIES = 100;
  private readonly DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private getCache(): CacheEntry[] {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch (error) {
      console.warn('Failed to parse cache:', error);
      return [];
    }
  }

  private setCache(entries: CacheEntry[]): void {
    try {
      // Clean expired entries
      const now = Date.now();
      const validEntries = entries.filter(entry => entry.expiresAt > now);

      // Limit to max entries
      const limitedEntries = validEntries.slice(-this.MAX_ENTRIES);

      localStorage.setItem(this.CACHE_KEY, JSON.stringify(limitedEntries));
    } catch (error) {
      console.warn('Failed to save cache:', error);
    }
  }

  get(key: string): unknown | null {
    const entries = this.getCache();
    const entry = entries.find(e => e.url === key);

    if (!entry) return null;

    if (entry.expiresAt < Date.now()) {
      // Remove expired entry
      this.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, data: unknown, ttl: number = this.DEFAULT_TTL, metadata?: { hash?: string; etag?: string }): void {
    const entries = this.getCache();
    const now = Date.now();

    // Remove existing entry
    const filteredEntries = entries.filter(e => e.url !== key);

    const newEntry: CacheEntry = {
      url: key,
      data,
      updatedAt: now,
      expiresAt: now + ttl,
      ...metadata
    };

    filteredEntries.push(newEntry);
    this.setCache(filteredEntries);
  }

  delete(key: string): void {
    const entries = this.getCache();
    const filteredEntries = entries.filter(e => e.url !== key);
    this.setCache(filteredEntries);
  }

  clear(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  has(key: string): boolean {
    const entries = this.getCache();
    const entry = entries.find(e => e.url === key);
    return entry ? entry.expiresAt > Date.now() : false;
  }

  // Check if data has changed based on hash or etag
  hasChanged(key: string, newHash?: string, newEtag?: string): boolean {
    const entries = this.getCache();
    const entry = entries.find(e => e.url === key);

    if (!entry) return true; // No cached data means it's "changed"

    if (newHash && entry.hash && newHash !== entry.hash) return true;
    if (newEtag && entry.etag && newEtag !== entry.etag) return true;

    return false;
  }

  // Heal corrupted cache
  heal(): void {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return;

      const entries = JSON.parse(cached);
      if (!Array.isArray(entries)) {
        this.clear();
        return;
      }

      const validEntries = entries.filter(entry =>
        entry &&
        typeof entry.url === 'string' &&
        entry.data !== undefined &&
        typeof entry.updatedAt === 'number' &&
        typeof entry.expiresAt === 'number'
      );

      this.setCache(validEntries);
    } catch (error) {
      console.warn('Failed to heal cache, clearing:', error);
      this.clear();
    }
  }

  // Get cache stats
  getStats(): { total: number; expired: number; size: number } {
    const entries = this.getCache();
    const now = Date.now();
    const expired = entries.filter(e => e.expiresAt <= now).length;

    let size = 0;
    try {
      size = JSON.stringify(entries).length;
    } catch {
      size = 0;
    }

    return {
      total: entries.length,
      expired,
      size
    };
  }
}

export const cacheManager = CacheManager.getInstance();
export default cacheManager;
