import * as express from "express";
import AuthRouter from "./AuthRouter";
import seatRouter from "./seatRouter";

const router: express.Router = express.Router();

router.use("/user", AuthRouter);
router.use("/seat", seatRouter);

export default router;
