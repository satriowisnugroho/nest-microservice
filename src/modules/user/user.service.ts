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
      async list() {
        return await userRepository.findAll();
      },
      async destroy(ctx) {
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
