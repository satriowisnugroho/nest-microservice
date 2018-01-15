import * as amqp from 'amqplib';

export const WorkerProviders = [
  {
    provide: 'Worker',
    useFactory: async () => {
      return amqp.connect('amqp://localhost:5672').then((conn) => conn.createChannel());
    },
  },
];