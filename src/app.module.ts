import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { RedisClientOptions } from 'redis';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
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
export class AppModule {}
