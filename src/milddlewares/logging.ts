import * as express from "express";
import logger from "morgan";
import rfs from "rotating-file-stream";
import path from "path";
import appRoot from "app-root-path";
console.log(path.join(appRoot.path, "log", "server.log"));
const logging = (req: express.Request, res: express.Response, next: express.NextFunction): express.RequestParamHandler => {
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV === "local" || NODE_ENV === "development") return logger("dev");
  else {
    const accessLogStream = rfs.createStream(path.join(appRoot.path, "log", "server.log"), {
      size: "10M", // rotate threshold
      interval: "1d", // rotate cycle
      compress: "gzip", // compress rotated files
    });

    return logger("short");
  }
};

export default logging;
