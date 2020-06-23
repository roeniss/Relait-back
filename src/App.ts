import * as express from "express";
import * as Sentry from "@sentry/node";
import * as cors from "cors";
import { errorHandler, logger, swagger } from "./middlewares";
import routers from "./routes";

const app = express();

// --------------------
//  Middlewares
// --------------------
Sentry.init({ dsn: process.env.SENTRY_URL });
app.use(Sentry.Handlers.requestHandler());
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
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

export default app;
