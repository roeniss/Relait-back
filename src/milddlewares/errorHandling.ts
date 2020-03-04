import * as express from "express";

const errorHandling = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === process.env.NODE_ENV || NODE_ENV === "development") {
    return res.status(500).send(err instanceof Object ? JSON.stringify(err) : err);
  } else {
    return res.sendStatus(500);
  }
};

export default errorHandling;
