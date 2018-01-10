import { Inject } from '@nestjs/common';
import User from './user.entity';

export class UserService {
  private name: string = 'user';
  private service: object;

  constructor(
    @Inject('Broker') private readonly broker,
    @Inject('UserRepository') private readonly userRepository: typeof User,
  ) {
    this.initService(this.userRepository);
    this.broker.createService(this.service);
  }

  initService(userRepository) {
    this.service = {
      name: this.name,
      actions: this.actions(userRepository),
    };
  }

  actions(userRepository) {
    return {
      async list(ctx) {
        return await userRepository.findAll();
      },
    };
  }
}
