import express from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { load } from "yamljs";

const SWAGGER_FILENAME = "./swagger.yaml";
const swaggerDocument = load(path.join(__dirname, SWAGGER_FILENAME));

const router = express.Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
