import * as express from "express";
import {
  isValidUser,
  haveParamsToCreateSeat,
  haveParamsToUpdateSeat,
} from "../milddlewares/vaildation";
import * as SeatController from "../controller/seat";

const router = express.Router();

router.get("/:page?", isValidUser, SeatController.getAvailableSeats);
router.get("/:id", isValidUser, SeatController.getSeat);
router.get("/status", isValidUser, SeatController.getMySeatStatus); // "글쓰기 버튼 누르는 순간 서버에서 create인지 patch인지 판단해서 수정할 글이 있다면 그 obj를 보내주는걸로 그리고 못 갈 경우도 있어. (예를 들면 take 중이라면!)."
router.get("/haveSeat", isValidUser, SeatController.checkCurrentSeat); // 위 기능을 하는 명령어가 현재 이건데, take에 대핵선 처리를 못해주는 중. 그리고 위쪽 네이밍이 더 정확한 것 같아. (기분탓인가 이건?)

router.post("/", isValidUser, SeatController.createSeat); // skip 'haveParamsToCreateSeat()' : field 체크를 DB로 해보자!
router.put("/:id", isValidUser, SeatController.updateSeat); // skip 'haveParamsToCreateSeat()' : field 체크를 DB로 해보자!
//                                                            그리고 patch 를 put으로 바꿀거야. 결국 모든 필드를 요구할거거든.
router.delete("/:id", isValidUser, SeatController.deleteSeat); // 삭제나 수정이 안되면 forbidden을 보내줘서 (403?) 명확하게 의미를 밝힐 것.
//                                                            참고용 코멘트 빌췌 : "수정/삭제 조건이,,, 날짜가 아니라 taken 여부로만 하면 되려나?"

router.get("/take/:id", isValidUser, SeatController.takeSeat); // 누군가 이미 예약했다면 실패해야겠지?

// ----------------- below: for debug
router.post("/restore/:id", SeatController.restoreSeat);

export default router;
