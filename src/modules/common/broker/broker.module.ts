import { Module, DynamicModule } from '@nestjs/common';
import { BrokerProviders } from './broker.providers';

@Module({
  components: [...BrokerProviders],
  exports: [...BrokerProviders],
})

export class BrokerModule {}