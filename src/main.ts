import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new ConsoleLogger());
  await app.listen(8000);
}
bootstrap();
