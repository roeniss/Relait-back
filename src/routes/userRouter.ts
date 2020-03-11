import * as express from "express";
import * as AuthController from "../controller/auth";
import { User } from "../db";
import { Jwt } from "../lib/helper";
import { checkLoginInput, checkIsUser } from "../milddlewares/vaildation";

const router: express.Router = express.Router();

router.post(
  "/login",
  checkLoginInput,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    try {
      const user: User = req.body;
      const JWT: Jwt = await AuthController.login(user);
      return res.status(200).json({ JWT });
    } catch (e) {
      return next(e);
    }
  }
);

router.delete(
  "/",
  checkIsUser,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    try {
      const token: Jwt = req.body["JWT"];
      const deletedUser: number = await AuthController.withdraw(token);
      if (deletedUser) return res.sendStatus(204);
      else throw new Error("Fail to delete the user");
    } catch (e) {
      return next(e);
    }
  }
);

// TODO: 카카오톡 or 기타 카카오 서비스를 통해서 회원탈퇴할 경우, 이를 위한 URL 카카오측에 제공해주고, 해당 URL에 접근했을 때 제공받은 정보로 유저 정보를 삭제해야 됨.
// router.get("/kakaoDirectDelete")

export default router;
