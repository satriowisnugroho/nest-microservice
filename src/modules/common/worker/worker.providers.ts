import * as amqp from 'amqplib';

export const WorkerProviders = [
  {
    provide: 'Worker',
    useFactory: async () => {
      return amqp.connect(process.env.RABBITMQ_HOST).then((conn) => conn.createChannel());
    },
  },
];