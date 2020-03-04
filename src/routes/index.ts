import * as express from "express";
import userRouter from "./userRouter";
import seatRouter from "./seatRouter";

const router: express.Router = express.Router();

router.use("/user", userRouter);
router.use("/seat", seatRouter);

export default router;
