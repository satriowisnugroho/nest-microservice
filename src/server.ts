import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as Raven from 'raven';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import {
  TransformInterceptor,
  HttpExceptionFilter,
} from './modules/common/index';

dotenv.config();
Raven.config(process.env.SENTRY_DSN).install();

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(Raven.requestHandler());
  app.use(bodyParser.json());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
  );
  app.use(Raven.errorHandler());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.APP_PORT);
}
bootstrap().then(() => console.log(`Application is listening on port ${process.env.APP_PORT}`));