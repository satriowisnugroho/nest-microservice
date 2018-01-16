import * as dotenv from 'dotenv';
import * as Raven from 'raven';
import * as argv from 'minimist';
import { random } from 'lodash';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';

dotenv.config();
Raven.config(process.env.SENTRY_DSN).install();
const arg = argv(process.argv.slice(2));

async function bootstrap() {
  const port = arg.port || random(50000, 65000);
  const app = await NestFactory.createMicroservice(ApplicationModule, { port });
  app.listen(() => console.log(`User Microservice is listening on port ${port}`));
}
bootstrap();