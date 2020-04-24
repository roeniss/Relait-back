import * as express from "express";
import {
  isValidUser,
  haveParamsToCreateSeat,
  haveParamsToUpdateSeat,
} from "../milddlewares/vaildation";
import * as SeatController from "../controller/seat";

const router = express.Router();


router.get("/", isValidUser, SeatController.getAvailableSeats);
router.post(
  "/",
  isValidUser,
  haveParamsToCreateSeat,
  SeatController.createSeat
);

router.get("/:id", isValidUser, SeatController.getSeat);
router.patch(
  "/:id",
  isValidUser,
  haveParamsToUpdateSeat,
  SeatController.updateSeat
);
router.delete("/:id", isValidUser, SeatController.deleteSeat);
router.post("/restore/:id", SeatController.restoreSeat);

router.get("/haveSeat", isValidUser, SeatController.checkCurrentSeat);


export default router;
