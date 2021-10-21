import { CamelCaseStrategy } from '@shared/infra/database/namingStrategy/CamelCaseStrategy';
import { ConnectionOptions } from 'typeorm';

export const databaseConfig = {
  mysqlDev: {
    type: process.env.MYSQL_TYPE,
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_TYPE),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    timezone: '+00:00',
    charset: 'utf8_general_ci',
    entities: ['./src/modules/**/infra/database/entities/*.ts'],
    migrations: ['./src/shared/infra/database/migrations/*.ts'],
    namingStrategy: new CamelCaseStrategy(),
    cli: {
      migrationsDir: './src/shared/infra/database/migrations',
    },
  } as ConnectionOptions,
};
