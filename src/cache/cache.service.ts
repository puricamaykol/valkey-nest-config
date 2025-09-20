import { Inject, Injectable } from '@nestjs/common';
import { GlideClient, GlideClusterClient, GlideString } from '@valkey/valkey-glide';
import { CacheInterface } from './cache.interface';

export const CacheType = Symbol('CacheType');

@Injectable()
export class CacheService implements CacheInterface {
  constructor(@Inject('VALKEY_CLIENT') private readonly valkey: GlideClusterClient | GlideClient) {}

  async setKey(key: string, val: string): Promise<void> {
    

    try {
        console.log('se ejecutó el setHEY <<<<<<<<<<<<<<<<<<<<<<<');
        await this.valkey.set(key, val);
    } catch (error) {
        console.log(error);

    }
  }

  async getKey(key: string): Promise<string | undefined> {
    const result = await this.valkey.get(key);
    if (!result) return undefined;
    return result?.toString();
  }
}