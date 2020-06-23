import * as express from "express";
import AuthRouter from "./AuthRouter";
import SeatRouter from "./SeatRouter";

const router: express.Router = express.Router();

router.use("/user", AuthRouter);
router.use("/seat", SeatRouter);

// URL : Not Found
router.use((_req, res, _next) => {
  res.sendStatus(404);
});

export default router;
