import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { routes } from './routes/index.routes';
import '@shared/containers';
import '@shared/infra/database';
import { appConfig } from '@config/app';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(helmet());
app.use(cors());

app.use(routes);
app.use(errorHandler);

app.listen(appConfig.serverPort, () => {
  console.log('Server running on port => ', appConfig.serverPort);
});
