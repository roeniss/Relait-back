import * as express from "express";
import * as AuthController from "../controller/auth";
import { hasValidLoginBody, isValidUser } from "../milddlewares/vaildation";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const router: express.Router = express.Router();

router.post("/login", hasValidLoginBody, AuthController.login);

export default router;
