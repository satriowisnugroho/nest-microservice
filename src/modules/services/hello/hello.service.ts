import { Inject } from '@nestjs/common';

export class HelloService {
  
  private name: string = 'test';
  private service: object;

  constructor(@Inject('Broker') private readonly broker) {
    this.initService();
    this.broker.createService(this.service);
  }
  
  initService() {
    this.service = {
      name: this.name,
      actions: this.actions()
    }
  }

  actions() {
      return {
        world(ctx) {
            return `hello world, ${ctx.params.a}`;
        }
      }
  }
}
