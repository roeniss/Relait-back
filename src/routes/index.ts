import * as express from "express";
import AuthRouter from "./AuthRouter";
import SeatRouter from "./SeatRouter";

const router: express.Router = express.Router();

router.use("/user", AuthRouter);
router.use("/seat", SeatRouter);

export default router;
