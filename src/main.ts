import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {Logger, ValidationPipe} from '@nestjs/common';
import {DelayInterceptor} from './infra/interceptors/delay.interceptor';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new DelayInterceptor());

  const config = new DocumentBuilder()
    .setTitle('PigTrack')
    .setDescription('The PigTracking API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);

  logger.log('Application is running on: http://localhost:3001/api');
}
bootstrap();
