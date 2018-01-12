import { Inject } from '@nestjs/common';
import User from './user.entity';

export class UserService {
  private name: string = 'user';
  private service: object;
  private user: typeof User;

  constructor(
    @Inject('Broker') private readonly broker,
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
        const amqp = require('amqplib/callback_api');

        amqp.connect('amqp://localhost:32769', (err, conn) => {
          if (conn) {
            conn.createChannel((err2, ch) => {
              const q = 'delete_user';
              const object = { user_id: ctx.params.id };

              try {
                if (ch) {
                  ch.assertQueue(q, { durable: true });
                  ch.sendToQueue(q, new Buffer(JSON.stringify(object)), { persistent: true });
                }
              } catch (e) {
                console.log('Queue', e);
              }
            });
          }
        });

        return 'sending to queue';
      },
    };
  }
}
