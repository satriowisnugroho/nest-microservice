import * as dotenv from 'dotenv';
import * as Raven from 'raven';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';

dotenv.config();
Raven.config(process.env.SENTRY_DSN).install();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule);
  app.listen(() => console.log(`User Microservice is running`));
}
bootstrap();