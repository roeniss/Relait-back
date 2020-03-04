import * as express from "express";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import path from "path";
import appRoot from "app-root-path";
import { isDev } from "../lib/helper";

const customLogger = (): express.RequestHandler => {
  if (isDev(process.env.NODE_ENV)) {
    return morgan("dev");
  } else {
    const accessLogStream: rfs.RotatingFileStream = rfs.createStream(path.join(appRoot.path, "log", "server.log"), {
      size: "10M", // rotate threshold
      interval: "1d", // rotate cycle
      compress: "gzip", // compress rotated files
    });
    return morgan("short", { stream: accessLogStream });
  }
};

export default customLogger;
