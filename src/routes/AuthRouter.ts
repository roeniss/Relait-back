import * as express from "express";
import * as AuthController from "../controller/auth";
import { validators } from "../middlewares";

const { isValidLoginBody, isValidUser } = validators;
const router: express.Router = express.Router();

router.post("/login", isValidLoginBody, AuthController.login);

// ----------------- below: for debug
router.delete("/", isValidUser, AuthController.deleteUser);

// URL : Not Found
router.use((_req, res, _next) => {
  res.sendStatus(404);
});

export default router;
