import * as express from "express";
import * as AuthController from "../controller/auth";
import { User, Jwt } from "../lib/helper";
import { checkLoginInput, checkSignupInput, checkDeleteInput } from "../milddlewares/vaildation";

const router: express.Router = express.Router();

router.post(
  "/login",
  checkLoginInput,
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
    try {
      const user: User = req.body;
      const JWT: Jwt | null = await AuthController.login(user);
      if (JWT) return res.status(200).json({ JWT });
      else return res.sendStatus(404);
    } catch (e) {
      return next(e);
    }
  }
);

router.post(
  "/signup",
  checkSignupInput,
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
    try {
      const user: User = req.body;
      const JWT: Jwt | null = await AuthController.login(user);
      if (JWT) return res.sendStatus(409);
      else {
        const JWT: Jwt | null = await AuthController.signup(user);
        if (JWT) return res.status(201).json({ JWT });
        else throw new Error("Fail to create a user");
      }
    } catch (e) {
      return next(e);
    }
  }
);

router.delete(
  "/",
  checkDeleteInput,
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
    try {
      const token: Jwt = req.body.JWT;
      if (!token) return res.sendStatus(404);
      const deletedUser: number | null = await AuthController.withraw(token);
      if (deletedUser) return res.sendStatus(204);
      else throw new Error("Fail to delete the user");
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
