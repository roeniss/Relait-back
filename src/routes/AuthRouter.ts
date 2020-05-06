import * as express from "express";
import * as AuthController from "../controller/auth";
import { hasValidLoginBody, isValidUser } from "../middlewares/vaildation";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const router: express.Router = express.Router();

router.post("/login", hasValidLoginBody, AuthController.login);

// ----------------- below: for debug
router.delete("/", AuthController.deleteUser);

export default router;
