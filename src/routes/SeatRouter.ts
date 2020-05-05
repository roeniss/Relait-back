import * as express from "express";
import { isValidUser } from "../middlewares/vaildation";
import * as SeatController from "../controller/seat";

const router = express.Router();

router.get("/", isValidUser, SeatController.getSeats);
router.get("/:id", isValidUser, SeatController.getSeat);
router.get("/status", isValidUser, SeatController.getStatus);

router.post("/", isValidUser, SeatController.createSeat);
router.put("/:id", isValidUser, SeatController.updateSeat);
router.delete("/:id", isValidUser, SeatController.deleteSeat);

router.get("/take/:id", isValidUser, SeatController.takeSeat);
router.delete("/take/:id", isValidUser, SeatController.cancelTakeSeat);

// ----------------- below: for debug
router.post("/restore/:id", SeatController.restoreSeat);

export default router;
