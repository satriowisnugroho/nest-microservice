import { ServiceBroker, Transporters } from 'moleculer';

const NatsTransporter = Transporters.NATS;

export const BrokerProviders = [
  {
    provide: 'Broker',
    useFactory: async () => {
      return new ServiceBroker({
        namespace: 'kioson',
        nodeID: process.argv[2] || `ms-server-${process.pid}`,
        transporter: new NatsTransporter(),
        logger: console,
        serializer: 'Avro',
      });
    },
  },
];