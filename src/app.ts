import "@/dbs/init.mongodb";

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { CustomError } from "@/@types/index";
import { corsConfig } from "@/configs/cors.config";
import router from "@/routes";

const app = express();

app.use(cors(corsConfig));
app.use(helmet());
app.use(compression());
app.use(morgan("short"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res, next) => {
  const error = new CustomError("Not found", 404);
  next(error);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  res.status(status).json({
    status,
    message: err.message || "Internal server error",
  });
});

export default app;
