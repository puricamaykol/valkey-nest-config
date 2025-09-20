import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlideClient, GlideClusterClient, Logger } from '@valkey/valkey-glide';
import { CacheService, CacheType } from './cache.service';

const valkeySingle = async (): Promise<GlideClient> => {
        const client = await GlideClient.createClient({
            addresses: [
                {
                    host: "localhost",
                    port: 6379,
                }
            ],
            // Ajusta timeouts/reintentos si quieres:
            lazyConnect: false,
            // if the cluster nodes use TLS, you'll need to enable it. Otherwise the connection attempt will time out silently.
            // useTLS: true,
            // It is recommended to set a timeout for your specific use case
            requestTimeout: 500, // 500ms timeout
            clientName: "test_cluster_client",
        });
        return client;
      };
    
const valkeyCluster = async (): Promise<GlideClusterClient> => {
        const client = await GlideClusterClient.createClient({
            addresses: [
                {
                    host: "valkey-7001",
                    port: 7001,
                },
                {
                    host: "valkey-7002",
                    port: 7002,
                },
                {
                    host: "valkey-7003",
                    port: 7003,
                },
                {
                    host: "valkey-7004",
                    port: 7004,
                },
                {
                    host: "valkey-7005",
                    port: 7005,
                },
                {
                    host: "valkey-7006",
                    port: 7006,
                }
            ],
            // Ajusta timeouts/reintentos si quieres:
            lazyConnect: false,
            // if the cluster nodes use TLS, you'll need to enable it. Otherwise the connection attempt will time out silently.
            // useTLS: true,
            // It is recommended to set a timeout for your specific use case
            requestTimeout: 5000, // 500ms timeout
            clientName: "test_cluster_client",
        });

        console.log(await client.set('foo', 'bar'));
        console.log(await client.get('foo'));
        return client;
      };

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: 'VALKEY_CLIENT',
      inject: [ConfigService],
      useFactory: valkeyCluster, // (process.env.NODE_ENV !== 'local') ? valkeySingle : valkeyCluster,
    },
    //CacheService,
    {provide: CacheType, useClass: CacheService}
  ],
  exports: ['VALKEY_CLIENT', {provide: CacheType, useClass: CacheService}],
})
export class CacheModule {}
