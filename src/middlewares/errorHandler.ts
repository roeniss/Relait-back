import * as express from "express";
import { isProduction } from "../lib";

const errorHandler = (
  err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
): express.Response => {
  const errorMsg = interpretError(err);
  console.error(`Server Error: ${errorMsg}`);

  if (isProduction()) return res.sendStatus(500);
  else return res.status(500).send(errorMsg);
};

export default errorHandler;

const interpretError = (value: Error) => {
  const { name, message, stack } = value;
  const payload = { name, message, stack };
  return JSON.stringify(payload);
};
