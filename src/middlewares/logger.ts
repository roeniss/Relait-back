import * as express from "express";
import * as morgan from "morgan";
import * as rfs from "rotating-file-stream";
import * as path from "path";
import { isProduction } from "../lib";

const LOG_PATH = path.join(__dirname, "../../", "log", "server.log");

const logger = (): express.RequestHandler => {
  if (isProduction()) {
    const loggerOptions: rfs.Options = {
      size: "10M", // rotate threshold
      interval: "1d", // rotate cycle
      compress: "gzip", // compress rotated files
    };
    const stream: rfs.RotatingFileStream = rfs.createStream(
      LOG_PATH,
      loggerOptions
    );
    return morgan("short", { stream });
  } else {
    return morgan("dev");
  }
};

export default logger;
