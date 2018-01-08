import { Module } from '@nestjs/common';
import { BrokerProviders } from './common/index';

@Module({
  modules: [],
  components: [...BrokerProviders],
  exports: [...BrokerProviders],
})
export class ApplicationModule {}