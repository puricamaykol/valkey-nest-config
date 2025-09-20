export interface CacheInterface {
    setKey(key: string, val: string): Promise<void>;
    
    getKey(key: string): Promise<string | undefined>;
}