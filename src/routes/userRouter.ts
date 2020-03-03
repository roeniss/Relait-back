import * as express from "express";
import AuthController from "../controller/auth";

const router = express.Router();

router.post("/login", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { vender, uniqueId } = req.body;
    const JWT = await AuthController.login(vender, uniqueId);
    if (JWT) return res.json({ JWT, apiStatus: 200 });
    else return res.json({ apiStatus: 401 });
  } catch (e) {
    return next(e);
  }
});

router.post("/signup", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { vender, uniqueId, nickname } = req.body;
    const JWT = await AuthController.login(vender, uniqueId);
    if (JWT) return res.json({ apiStatus: 402 });
    else {
      const JWT = await AuthController.signup(vender, uniqueId, nickname);
      if (JWT) return res.json({ JWT, apiStatus: 200 });
      else return res.json({ apiStatus: 500 });
    }
  } catch (e) {
    return next(e);
  }
});

export default router;
