import * as express from "express";
import userRouter from "./userRouter";
import seatRouter from "./seatRouter";
import bookRouter from "./bookRouter";

const router = express.Router();

router.use("/user", userRouter);
router.use("/seat", seatRouter);
router.use("/book", bookRouter);

export default router;
