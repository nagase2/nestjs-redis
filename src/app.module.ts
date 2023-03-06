import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    // ローカルメモリへのキャッシュ。機能的には変わらないのでこれでも良いのかも
    // こちらのttlはmsで指定
    //CacheModule.register({ isGlobal: true, ttl: 10000, max: 5 }),
    // 以下はRedisキャッシュとして利用する場合
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      ttl: 30, // ←デフォルトのttl。ここは秒単位で指定
      // Store-specific configuration:
      host: 'localhost',
      port: 16379,
      // max: 3,
    }),
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
