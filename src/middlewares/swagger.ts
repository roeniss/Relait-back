import * as express from "express";
import * as swaggerUi from "swagger-ui-express";
import * as path from "path";
import { load } from "yamljs";

const SWAGGER_FILENAME = "./swagger.yaml";
const swaggerDocument = load(path.join(__dirname, SWAGGER_FILENAME));

const router = express.Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
