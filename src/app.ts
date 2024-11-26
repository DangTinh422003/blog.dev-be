import '@/dbs/init.mongodb';

import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { corsConfig } from '@/configs/cors.config';
import { CustomError } from '@/core/error.response';
import router from '@/routes';

const app = express();

const configureMiddlewares = (app: express.Application) => {
  app.use(cors(corsConfig));
  app.use(helmet());
  app.use(compression());
  app.use(morgan('short'));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const configureRoutes = (app: express.Application) => {
  app.use(router);

  app.use((req, res, next) => {
    next(new CustomError('Not found', 404));
  });
};

const configureErrorHandling = (app: express.Application) => {
  app.use(
    (err: CustomError, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || 500;
      res.status(status).json({
        status,
        message: err.message || 'Internal server error',
      });
    },
  );
};

const setupApplication = (app: express.Application) => {
  configureMiddlewares(app);
  configureRoutes(app);
  configureErrorHandling(app);
};

setupApplication(app);
export default app;
