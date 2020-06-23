import * as express from "express";
import { validators } from "../middlewares";
import * as SeatController from "../controller/seat";

const router = express.Router();

const { isValidUser } = validators;

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

// URL : Not Found
router.use((_req, res, _next) => {
  res.sendStatus(404);
});

export default router;
