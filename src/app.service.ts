import { Inject, Injectable } from '@nestjs/common';
import { CacheService, CacheType } from './cache/cache.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(CacheType) private readonly cacheService: CacheService
  ) {}
  async getHello(): Promise<string> {
    await this.cacheService.setKey('nombre', 'juanito');
    console.log(await this.cacheService.getKey('nombre'));
    return 'Hello World!';
  }
}
