import { ServiceBroker, Transporters } from 'moleculer';
import * as path from 'path'

const NatsTransporter = Transporters.NATS;

export const BrokerProviders = [
  {
    provide: 'Broker',
    useFactory: async () => {
      const broker = new ServiceBroker({
        namespace: 'kioson',
        nodeID: process.argv[2] || `server- ${process.pid}`,
        transporter: new NatsTransporter(),
        logger: console,
      });
      return broker;
    },
  },
];