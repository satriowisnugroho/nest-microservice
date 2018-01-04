import {
  Module,
  MiddlewaresConsumer,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  components: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
