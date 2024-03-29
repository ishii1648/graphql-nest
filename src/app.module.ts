import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  Inject,
  Logger,
} from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { RedisClientOptions } from 'redis';
import { redisStore, RedisCache } from 'cache-manager-redis-yet';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import { LoggerMiddleware } from './logger.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MetricsModule } from './metrics/metrics.module';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    MetricsModule,
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager: RedisCache) {
    cacheManager.store.client.on('error', (error) => {
      Logger.error(`occur redis exception: ${error}`);
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
