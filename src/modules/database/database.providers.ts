import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      return new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        modelPaths: [__dirname + '/../**/*.entity.ts'],
      });
    },
  },
];