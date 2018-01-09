import { Module } from '@nestjs/common';
import { BrokerModule } from '../../common/index';
import { HelloService } from './hello.service';

@Module({
  imports: [BrokerModule],
  components: [HelloService],
})

export class HelloModule {}