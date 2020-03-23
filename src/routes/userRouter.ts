import * as express from "express";
import * as AuthController from "../controller/auth";
import * as SeatController from "../controller/seat";
import { Op } from "sequelize";
import { User, Seat } from "../db";
import { Jwt, JwtPayload, decryptJwt, mysqlDateFormat } from "../lib/helper";
import { checkLoginInput, checkIsUser } from "../milddlewares/vaildation";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const router: express.Router = express.Router();

router.post(
  "/login",
  checkLoginInput,
  async (req, res, next): Promise<express.Response | void> => {
    try {
      const user: User = req.body;
      const JWT: Jwt = await AuthController.login(user);
      // const seat: Seat | null = await SeatController.haveSeat(JWT);
      return res.status(200).json({ JWT /* , seat */ });
    } catch (e) {
      return next(e);
    }
  }
);

router.delete(
  "/",
  checkIsUser,
  async (req, res, next): Promise<express.Response | void> => {
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

router.get(
  "/state",
  checkIsUser,
  async (req, res, next): Promise<express.Response | void> => {
    try {
      const JWT: Jwt = req.body.JWT;
      const payload: JwtPayload = decryptJwt(JWT);
      const nowDate: string = moment()
        .hour(0)
        .minute(0)
        .second(0)
        .format(mysqlDateFormat);
      const giveSeat: Seat | null = await Seat.findOne({
        where: {
          giverId: payload.id,
          createdAt: {
            [Op.gte]: nowDate,
          },
        },
      });
      const takeSeat: Seat | null = await Seat.findOne({
        where: {
          takenId: payload.id,
          createdAt: {
            [Op.gte]: nowDate,
          },
        },
      });
      const status = giveSeat ? "give" : takeSeat ? "take" : "none";
      return res.status(200).json({ status, seat: giveSeat || takeSeat });
    } catch (e) {
      return next(e);
    }
  }
);

// TODO: 카카오톡 or 기타 카카오 서비스를 통해서 회원탈퇴할 경우, 이를 위한 URL 카카오측에 제공해주고, 해당 URL에 접근했을 때 제공받은 정보로 유저 정보를 삭제해야 됨.
// router.get("/kakaoDirectDelete")

export default router;
