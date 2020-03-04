import * as express from "express";
import * as AuthController from "../controller/auth";
import { User, Jwt } from "../lib/helper";

const router: express.Router = express.Router();

router.post(
  "/login",
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
    try {
      const user: User = req.body;
      const JWT: Jwt | null = await AuthController.login(user);
      if (JWT) return res.json({ JWT, apiStatus: 200 });
      else return res.json({ apiStatus: 404 });
    } catch (e) {
      return next(e);
    }
  }
);

router.post(
  "/signup",
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
    try {
      const user: User = req.body;
      const JWT: Jwt | null = await AuthController.login(user);
      if (JWT) return res.json({ apiStatus: 409 });
      else {
        const JWT: Jwt | null = await AuthController.signup(user);
        if (JWT) return res.json({ JWT, apiStatus: 200 });
        else return res.json({ apiStatus: 500 });
      }
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
