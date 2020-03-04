import * as express from "express";
import { isDev } from "../lib/helper";

const errorHandling = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
  if (isDev(process.env.NODE_ENV)) {
    return res.status(500).send(err instanceof Object ? JSON.stringify(err) : err);
  } else {
    return res.sendStatus(500);
  }
};

export default errorHandling;
