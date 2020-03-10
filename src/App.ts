import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandling, customLogger } from "./milddlewares";
import routers from "./routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    // 공통 미들웨어들
    this.app.use(customLogger());
    this.app.use(cors());
    this.app.use(bodyParser.json());

    // 라우팅
    this.app.use("/", routers);

    // 에러 핸들링
    this.app.use(errorHandling);
  }
}

export default App;
