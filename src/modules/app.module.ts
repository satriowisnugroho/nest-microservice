import { Module, Inject } from '@nestjs/common';
import { BrokerModule } from './common/index';
import { HelloModule } from './services/hello/hello.module';

@Module({
  modules: [BrokerModule, HelloModule],
})

export class ApplicationModule {
  constructor(@Inject('Broker') private readonly broker) {
    this.broker.repl();
  }
}