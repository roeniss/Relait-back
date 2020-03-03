import express from "express";
import bodyParser from "body-parser";
import Router from "./routes/index";
import logger from "morgan";

class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();

    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use("/", Router);
    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.send("Hello world");
    });

    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const env = process.env.NODE_ENV;
      if (env === "local" || env === "development") {
        res.send(err);
      } else {
        res.sendStatus(500);
      }
    });
  }
}

export default App;
