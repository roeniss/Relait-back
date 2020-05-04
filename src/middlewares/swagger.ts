import express from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";

const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));

const router: express.Router = express.Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
