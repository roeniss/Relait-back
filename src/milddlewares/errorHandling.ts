import * as express from "express";
import { isDev, errorToString } from "../lib/helper";

const errorHandling = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
  if (isDev(process.env.NODE_ENV)) {
    return res.status(500).send(errorToString(err));
  } else {
    return res.sendStatus(500);
  }
};

export default errorHandling;
