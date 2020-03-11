import "source-map-support/register"; // for source-map
import "../env"; // dotenv root
import App from "./App";
import * as express from "express";

const port: number = Number(process.env.PORT) || 9000;
const app: express.Application = new App().app;

app.listen(port, () => console.log(`Express server listening at ${port} (${new Date()})`)).on("error", (err) => console.error(err));
