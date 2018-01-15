import { Module, Inject } from '@nestjs/common';
import { BrokerModule } from './common/index';
import { UserModule } from './user/user.module';

@Module({
  imports: [BrokerModule, UserModule],

})

export class ApplicationModule {
  constructor(@Inject('Broker') private readonly broker) {
    this.init();
  }

  async init() {
    await this.broker.start();
    await this.broker.repl();
  }
}