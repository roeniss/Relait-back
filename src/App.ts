import * as express from "express";
import * as Sentry from "@sentry/node";
import * as cors from "cors";
import { errorHandler, logger, swagger } from "./middlewares";
import routers from "./routes";
import { isProduction } from "./lib";

const app = express();

// --------------------
//  Middlewares
// --------------------
Sentry.init({ dsn: process.env.SENTRY_URL });
if (isProduction()) {
  app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
}
app.use(logger());
app.use(cors());
app.use(express.json());
app.use("/swagger", swagger);

// --------------------
//  Routings
// --------------------
app.use("/", routers);

// --------------------
//  Error handling
// --------------------
if (isProduction()) {
  app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
} else {
  app.use(errorHandler);
}
export default app;
