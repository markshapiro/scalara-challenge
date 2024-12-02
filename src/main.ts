import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

import { seed } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  seed(app.get(DataSource))

  const config = new DocumentBuilder()
    .setTitle('Bank API')
    .setDescription('API for managing banks and transactions')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();