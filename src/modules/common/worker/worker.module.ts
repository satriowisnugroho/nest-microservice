import { Module } from '@nestjs/common';
import { WorkerProviders } from './worker.providers';

@Module({
  components: [...WorkerProviders],
  exports: [...WorkerProviders],
})

export class WorkerModule {}