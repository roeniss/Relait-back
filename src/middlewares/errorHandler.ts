import * as express from "express";
import { isProduction } from "../lib";

const errorHandler: express.ErrorRequestHandler = (err, _req, res, _next) => {
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
