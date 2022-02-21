import express, { Application, json, NextFunction, Request, Response, urlencoded } from "express";
import compression from "compression";
import cors from "cors";

import RoutesV1 from "./api/routes";
import Logger from "./core/Logger";
import { environment, port as EnvPort } from "./config";
import { ApiError, InternalError, NotFoundError } from "./core/ApiError";


process.on("uncaughtException", e => {
  Logger.error(e);
});

const app: Application = express();
export const port = process.env.PORT || EnvPort;

app.set("port", port);

//gzip compression to reduce file size before sending to the web browser. Reduces latency and lag
app.use(compression());

app.use(cors());

app.use(urlencoded({ limit: "10mb", extended: false, parameterLimit: 10000 }));

app.use(json({ limit: "10mb" }));

//middleware for routes
app.use("/", RoutesV1);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

//custom error handler for all routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === "development") {
      Logger.error(err);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
