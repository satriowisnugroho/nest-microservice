import { Module, Inject } from '@nestjs/common';
import { BrokerModule } from './common/index';
import { UserModule } from './user/user.module';

@Module({
  modules: [BrokerModule, UserModule],
})

export class ApplicationModule {
  constructor(@Inject('Broker') private readonly broker) {
    this.broker.start().then(() => this.broker.repl());
  }
}