import * as express from "express";
import { Op } from "sequelize";
import {
  isValidUser,
  haveParamsToCreateSeat,
  haveParamsToUpdateSeat,
} from "../milddlewares/vaildation";
import { User, Seat } from "../db/schema";
import * as SeatController from "../controller/seat";
import {
  getOffsetTime,
  mysqlDateFormat,
  Jwt,
  decryptJwt,
  JwtPayload,
} from "../lib/helper";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const router = express.Router();

router.get("/", isValidUser, SeatController.getAvailableSeats);
router.get("/haveSeat", isValidUser, SeatController.checkCurrentSeat);
router.get("/:id", isValidUser, SeatController.getSeat);
router.post(
  "/",
  isValidUser,
  haveParamsToCreateSeat,
  SeatController.createSeat
);
router.patch(
  "/:id",
  isValidUser,
  haveParamsToUpdateSeat,
  SeatController.updateSeat
);
router.delete("/:id", isValidUser, SeatController.deleteSeat);
router.post("/restore/:id", SeatController.restoreSeat);

export default router;
