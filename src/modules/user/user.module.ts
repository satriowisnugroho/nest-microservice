import { Module } from '@nestjs/common';
import { BrokerModule, WorkerModule } from '../common/index';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [BrokerModule, DatabaseModule, WorkerModule],
  components: [UserService, userProviders],
})

export class UserModule {}
