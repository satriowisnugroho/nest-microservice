import * as dotenv from 'dotenv';
import * as Raven from 'raven';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';

dotenv.config();
Raven.config(process.env.SENTRY_DSN).install();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule, {
    port: process.env.APP_PORT,
  });
  app.listen(() => console.log(`User Microservice is listening on port ${process.env.APP_PORT}`));
}
bootstrap();