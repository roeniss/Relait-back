import * as express from "express";
import {
  isValidUser,
  haveParamsToCreateSeat,
  haveParamsToUpdateSeat,
} from "../milddlewares/vaildation";
import * as SeatController from "../controller/seat";

const router = express.Router();

/**
 * @swagger
 *
 * /seat:
 *   get:
 *     tags:
 *       - "Seat"
 *     description: "이용 가능한 seat들의 배열을 받아온다"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         type: "object"
 *         required:
 *         - "JWT"
 *         properties:
 *           JWT:
 *             type: "string"
 *     responses:
 *       200:
 *         description: '{seats: [{seat1}, {seat2}, ...]}'
 *       422:
 *         description: 필수 파라미터 부족
 */
router.get("/", isValidUser, SeatController.getAvailableSeats);

/**
 * @swagger
 *
 * '/seat/haveSeat':
 *   get:
 *     tags:
 *       - "Seat"
 *     description: "본인이 등록한(give) seat 데이터를 가져온다"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         type: "object"
 *         required:
 *         - "JWT"
 *         properties:
 *           JWT:
 *             type: "string"
 *     responses:
 *       200:
 *         description: seat
 *       403:
 *         description: 정상적인 유저가 아님
 *       404:
 *         description: NOT_FOUND
 *       422:
 *         description: 필수 파라미터 부족
 */
router.get("/haveSeat", isValidUser, SeatController.checkCurrentSeat);

/**
 * @swagger
 *
 * '/seat/:id':
 *   get:
 *     tags:
 *       - "Seat"
 *     description: "해당 id의 seat 정보를 가져온다"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         type: "object"
 *         required:
 *         - "JWT"
 *         properties:
 *           JWT:
 *             type: "string"
 *     responses:
 *       200:
 *         description: seat
 *       403:
 *         description: 정상적인 유저가 아님
 *       404:
 *         description: NOT_FOUND
 *       422:
 *         description: 필수 파라미터 부족
 *   patch:
 *     tags:
 *       - "Seat"
 *     description: "해당 id의 seat 내용을 수정한다 (업데이트 할 파라미터가 하나 이상 필요)"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         type: "object"
 *         required:
 *         - "JWT"
 *         properties:
 *           JWT:
 *             type: "string"
 *           leaveAt:
 *             type: "string"
 *           descriptionGiver:
 *             type: "string"
 *           cafeName:
 *             type: "string"
 *           spaceKakaoMapId:
 *             type: "string"
 *           address:
 *             type: "string"
 *           geoLocation:
 *             type: "string"
 *           havePlug:
 *             type: "string"
 *           thumbnailUrl:
 *             type: "string"
 *           descriptionSeat:
 *             type: "string"
 *           descriptionCloseTime:
 *             type: "string"
 *     responses:
 *       204:
 *         description: 업데이트 완료
 *       403:
 *         description: 정상적인 유저가 아님
 *       404:
 *         description: 업데이트 된 데이터가 없음 (자신의 id로 등록된 게시물인 아닌 경우도 이쪽)
 *       422:
 *         description: 필수 파라미터 부족
 *   delete:
 *     tags:
 *       - "Seat"
 *     description: "해당 id의 seat 정보를 삭제한다"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         type: "object"
 *         required:
 *         - "JWT"
 *         properties:
 *           JWT:
 *             type: "string"
 *     responses:
 *       204:
 *         description: 삭제 완료
 *       403:
 *         description: 정상적인 유저가 아님
 *       404:
 *         description: 삭제 된 데이터가 없음 (자신의 id로 등록된 게시물인 아닌 경우도 이쪽)
 *       422:
 *         description: 필수 파라미터 부족
 */
router.get("/:id", isValidUser, SeatController.getSeat);
router.patch(
  "/:id",
  isValidUser,
  haveParamsToUpdateSeat,
  SeatController.updateSeat
);
router.delete("/:id", isValidUser, SeatController.deleteSeat);

/**
 * @swagger
 *
 * /seat:
 *   post:
 *     tags:
 *       - "Seat"
 *     description: "새로운 seat를 등록한다"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         type: "object"
 *         required:
 *         - "JWT"
 *         properties:
 *           JWT:
 *             type: "string"
 *           leaveAt:
 *             type: "string"
 *           descriptionGiver:
 *             type: "string"
 *           cafeName:
 *             type: "string"
 *           spaceKakaoMapId:
 *             type: "string"
 *           address:
 *             type: "string"
 *           geoLocation:
 *             type: "string"
 *           havePlug:
 *             type: "string"
 *           thumbnailUrl:
 *             type: "string"
 *           descriptionSeat:
 *             type: "string"
 *           descriptionCloseTime:
 *             type: "string"
 *     responses:
 *       201:
 *         description: 게시물 등록 성공
 *       403:
 *         description: 정상적인 유저가 아님
 *       422:
 *         description: 필수 파라미터 부족
 */
router.post(
  "/",
  isValidUser,
  haveParamsToCreateSeat,
  SeatController.createSeat
);

/**
 * @swagger
 *
 * '/restore/:id':
 *   post:
 *     tags:
 *       - "Seat"
 *     description: "삭제한 seat를 원상복구한다 (for test)"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         type: "object"
 *         required:
 *         - "JWT"
 *         properties:
 *           JWT:
 *             type: "string"
 *     responses:
 *       204:
 *         description: 복구 성공
 *       403:
 *         description: 정상적인 유저가 아님
 *       404:
 *         description: 변동 사항 없음
 *       422:
 *         description: 필수 파라미터 부족
 */
router.post("/restore/:id", SeatController.restoreSeat);

export default router;
