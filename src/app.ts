import { CustomError } from '@/@types/index';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from '@/routes';
import { corsConfig } from '@/configs/cors.config';

import '@/dbs/init.mongodb';

const app = express();

app.use(cors(corsConfig));
app.use(helmet());
app.use(compression());
app.use(morgan('short'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res, next) => {
  const error = new CustomError('Not found', 404);
  next(error);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  res.status(status).json({
    status,
    message: err.message || 'Internal server error',
  });
});

export default app;
