import express from "express";
import bodyParser from "body-parser";
import Routers from "./routes/index";
import logger from "morgan";
import cors from "cors";

class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();

    this.app.use(logger("dev"));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use("/", Routers);

    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const env = process.env.NODE_ENV;
      if (env === "local" || env === "development") {
        res.status(500).send(err instanceof Object ? JSON.stringify(err) : err);
      } else {
        res.sendStatus(500);
      }
    });
  }
}

export default App;
