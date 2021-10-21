import { databaseConfig } from '@config/database';
import { createConnection } from 'typeorm';

createConnection(databaseConfig.mysqlDev);
