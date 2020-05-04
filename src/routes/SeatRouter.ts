import * as express from "express";
import { isValidUser } from "../middlewares/vaildation";
import * as SeatController from "../controller/seat";

const router = express.Router();

router.get("/:page?", isValidUser, SeatController.getSeats);
router.get("/:id", isValidUser, SeatController.getSeat);
router.get("/status", isValidUser, SeatController.getStatus); // "글쓰기 버튼 누르는 순간 서버에서 create인지 patch인지 판단해서 수정할 글이 있다면 그 obj를 보내주는걸로 그리고 못 갈 경우도 있어. (예를 들면 take 중이라면!)."

router.post("/", isValidUser, SeatController.createSeat);
router.put("/:id", isValidUser, SeatController.updateSeat);
router.delete("/:id", isValidUser, SeatController.deleteSeat);
// router.get("/take/:id", isValidUser, SeatController.takeSeat); // 누군가 이미 예약했다면 실패해야겠지?

// ----------------- below: for debug
router.post("/restore/:id", SeatController.restoreSeat);

export default router;
