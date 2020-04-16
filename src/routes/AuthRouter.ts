import * as express from "express";
import * as AuthController from "../controller/auth";
import * as SeatController from "../controller/seat";
import { Op } from "sequelize";
import { User, Seat } from "../db";
import { Jwt, JwtPayload, decryptJwt, mysqlDateFormat } from "../lib/helper";
import { hasValidLoginBody, isValidUser } from "../milddlewares/vaildation";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const router: express.Router = express.Router();

router.post("/login", hasValidLoginBody, AuthController.login);

// router.get("/state", isValidUser, async (req, res, next) => {
//   try {
//     const JWT: Jwt = req.body.JWT;
//     const payload: JwtPayload = decryptJwt(JWT);
//     const nowDate: string = moment()
//       .hour(0)
//       .minute(0)
//       .second(0)
//       .format(mysqlDateFormat);
//     const giveSeat: Seat | null = await Seat.findOne({
//       where: {
//         giverId: payload.id,
//         createdAt: {
//           [Op.gte]: nowDate,
//         },
//       },
//     });
//     const takeSeat: Seat | null = await Seat.findOne({
//       where: {
//         takenId: payload.id,
//         createdAt: {
//           [Op.gte]: nowDate,
//         },
//       },
//     });
//     const status = giveSeat ? "give" : takeSeat ? "take" : "none";
//     return res.status(200).json({ status, seat: giveSeat ?? takeSeat });
//   } catch (e) {
//     return next(e);
//   }
// });

export default router;
