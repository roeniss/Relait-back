import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandling, logging } from "./milddlewares";

import Routers from "./routes/index";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(logging);
    this.app.use(cors());
    this.app.use(bodyParser.json());

    // 전체 총괄 라우팅
    this.app.use("/", Routers);

    // 모든 에러는 이쪽으로 모인다
    this.app.use(errorHandling);
  }
}

export default App;
