import express from "express";
import cors from "cors";
import { errorHandling, customLogger } from "./milddlewares";
import routers from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    // 공통 미들웨어들
    this.app.use(customLogger());
    this.app.use(cors());
    this.app.use(express.json());

    // 라우팅
    this.app.use("/", routers);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // 에러 핸들링
    this.app.use(errorHandling);
  }
}

export default App;
