import { Inject } from '@nestjs/common';
import User from './user.entity';

export class UserService {
  private name: string = 'user';
  private service: object;
  private user: typeof User;

  constructor(
    @Inject('Broker') private readonly broker: any,
    @Inject('Worker') private readonly worker: any,
    @Inject('UserRepository') private readonly userRepository: typeof User,
  ) {
    this.initService();
    this.user = this.userRepository;
    this.broker.createService(this.service);
  }

  initService() {
    this.service = {
      name: this.name,
      actions: this.actions(),
    };
  }

  actions() {
    return {
      list: async () => {
        return await this.user.findAll();
      },
      destroy: async (ctx) => {
        const worker = this.worker;
        const q = 'delete_user';
        const object = { user_id: ctx.params.id };

        try {
          worker.assertQueue(q, { durable: true });
          worker.sendToQueue(q, new Buffer(JSON.stringify(object)), { persistent: true });
        } catch (e) {
          console.log('Queue', e);
        }

        return 'sending to queue';
      },
      worker_destroy: async (ctx) => {
        await this.user.destroy({
          where: { id: ctx.params.id },
        });

        return 'deleting user';
      },
    };
  }
}
