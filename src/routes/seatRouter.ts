import * as express from "express";
import { Op } from "sequelize";
import { isValidUser } from "../milddlewares/vaildation";
import { User, Seat } from "../db/schema";
import * as SeatController from "../controller/seat";
import {
  getOffsetTime,
  mysqlDateFormat,
  Jwt,
  decryptJwt,
  JwtPayload,
} from "../lib/helper";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const router = express.Router();

router.get("/", isValidUser, SeatController.getAvailableSeats);
router.get("/haveSeat", isValidUser, SeatController.checkCurrentSeat);
// router.post("/", isValidUser, SeatController.checkCurrentSeat);
// router.patch("/:id", isValidUser, SeatController.checkCurrentSeat);
/* 
let dummyDataIdx = 1;
const dummyData_Seat: Array<any> = [
  {
    id: dummyDataIdx++,
    giverId: 1,
    leaveAt: `23:00`,
    descriptionGiver: "검은색 패딩 입고 있어요",
    seatStatus: 1,
    cafeName: "타르타르 신촌점",
    spaceKakaoMapId: "1581510210",
    address: "서울 서대문구 연세로2길 3",
    geoLocation: "37.555983:126.937245",
    havePlug: true,
    thumbnailUrl:
      "http://img1.daumcdn.net/thumb/T800x0.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F404483F059764A0DA24C3FC4FD891824",
    descriptionSeat: "창가 자리입니다",
    descriptionCloseTime: `24:00`,
  },
  {
    "giverId": 2,
    "leaveAt": "2020-04-08:20:00",
    "descriptionGiver": "남방에 청바지 입고 있고 모자 쓰고 있습니당",
    "seatStatus": 2,
    "cafeName": "투썸플레이스 신촌점",
    "spaceKakaoMapId": "11221603",
    "address": "서울 서대문구 신촌로 93 1층",
    "geoLocation": "37.555634:126.936586",
    "havePlug": false,
    "thumbnailUrl":
      "http://img1.daumcdn.net/thumb/T680x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F5026B83C0E274FA19A3106E1E471036C",
    "descriptionSeat": "2인석 자리입니다. 카운터 근처임",
    "descriptionCloseTime": "2020-04-08:20:00"
    // takerId: 3,
    // takenAt: getOffsetTime(-1).format(mysqlDateFormat),
  },
];
 */
router.get("/:id", isValidUser, async (req, res, next) => {
  const id: string = req.params.id;
  try {
    const seat: Seat | null = await Seat.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ seat });
  } catch (e) {
    return next(e);
  }
});

router.post("/", isValidUser, async (req, res, next) => {
  const JWT = <string>req.body.JWT;
  const jwtPayload: JwtPayload | null = decryptJwt(JWT);
  let giverId: number = jwtPayload ? jwtPayload.id : 999;
  const {
    leaveAt,
    descriptionGiver,
    cafeName,
    spaceKakaoMapId,
    address,
    geoLocation,
    havePlug,
    thumbnailUrl,
    descriptionSeat,
    descriptionCloseTime,
  } = req.body;
  console.log();

  const seatStatus = 1;
  // TODO: 아래 검증은 middleware로 분리
  if (
    !leaveAt ||
    !descriptionGiver ||
    !cafeName ||
    !spaceKakaoMapId ||
    !address ||
    !geoLocation ||
    havePlug === undefined ||
    !thumbnailUrl ||
    !descriptionSeat ||
    !descriptionCloseTime
  )
    return res.sendStatus(422);
  const newSeat: Seat = await Seat.create({
    giverId,
    seatStatus,
    leaveAt,
    descriptionGiver,
    cafeName,
    spaceKakaoMapId,
    address,
    geoLocation,
    havePlug,
    thumbnailUrl,
    descriptionSeat,
    descriptionCloseTime,
  });
  return res.sendStatus(201);
});

router.patch("/:id", isValidUser, async (req, res, next) => {
  const id: string = req.params.id;
  const updatableData = [
    "leaveAt",
    "descriptionGiver",
    "cafeName",
    "spaceKakaoMapId",
    "address",
    "geoLocation",
    "havePlug",
    "thumbnailUrl",
    "descriptionSeat",
    "descriptionCloseTime",
  ];
  const patchBody: any = {};
  Object.entries(req.body).forEach(([k, v]) => {
    if (updatableData.includes(k)) patchBody[k] = v;
  });
  const nowMinus10HHMM: string = `${moment()
    .add("m", 10)
    .hour()}:${moment().add("m", 10).minute()}`;

  console.log(patchBody);

  const updatedSeats: [number, Seat[]] = await Seat.update(patchBody, {
    where: {
      id: id,
    },
  });

  // 수정할 수 없는 경우 적절한 리턴 필요 (예를 들면 10분도 안남았다던가)

  return res.sendStatus(204);
});

router.delete("/:id", isValidUser, async (req, res, next) => {
  const id: string = req.params.id;
  const deletedSeatsCnt: number = await Seat.destroy({
    where: {
      id: id,
    },
  });
  return res.sendStatus(204);
});

export default router;
