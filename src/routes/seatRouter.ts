import * as express from "express";
import { checkIsUser } from "../milddlewares/vaildation";
import { Seat } from "../lib/helper";
import * as SeatController from "../controller/seat";

const router: express.Router = express.Router();

// TODO: below
// router.get(
//   "/:seatId",
//   checkUser,
//   async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
//     try {
//       const { seatId } = req.params;
//       const seat: Seat | null = await SeatController.getSeat(seatId);
//       console.log(seat);
//       if (seat) return res.status(200).json({ seat });
//       else return res.sendStatus(404);
//     } catch (e) {
//       return next(e);
//     }
//   }
// );

export default router;
