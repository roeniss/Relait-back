import * as express from "express";
import { Op } from "sequelize";
import { checkIsUser } from "../milddlewares/vaildation";
import { User, Seat } from "../db/schema";
import { getOffsetTime, mysqlDateFormat, Jwt, decryptJwt } from "../lib/helper";

const router: express.Router = express.Router();
/* 
router.get(
  "/",
  checkIsUser,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    const now: string = getOffsetTime(0).format(mysqlDateFormat);
    try {
      const seats: Seat[] = await Seat.findAll({
        where: {
          seatStatus: 1,
          leaveAt: {
            [Op.gte]: now,
          },
        },
      });
      console.log(seats);
      return res.status(200).json({ seats });
    } catch (e) {
      return next(e);
    }
  }
); */

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
    id: dummyDataIdx++,
    giverId: 2,
    leaveAt: `19:00`,
    descriptionGiver: "남방에 청바지 입고 있고 모자 쓰고 있습니당",
    seatStatus: 2,
    cafeName: "투썸플레이스 신촌점",
    spaceKakaoMapId: "11221603",
    address: "서울 서대문구 신촌로 93 1층",
    geoLocation: "37.555634:126.936586",
    havePlug: false,
    thumbnailUrl:
      "http://img1.daumcdn.net/thumb/T680x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F5026B83C0E274FA19A3106E1E471036C",
    descriptionSeat: "2인석 자리입니다. 카운터 근처임",
    descriptionCloseTime: `22:30`,
    // takerId: 3,
    // takenAt: getOffsetTime(-1).format(mysqlDateFormat),
  },
];

router.get(
  "/:id",
  /* checkIsUser, */ (req, res, next) => {
    // TODO: 현재는 더미 데이터 (위쪽 참고) 적용중.
    const id: string = req.params.id;
    let targetData = null;
    dummyData_Seat.forEach((each) => {
      if (each.id === Number(id)) targetData = each;
    });
    if (!targetData) return res.sendStatus(404);
    else return res.status(200).json({ seat: targetData });
  }
);
router.get(
  "/",
  /* checkIsUser, */ (req, res, next) => {
    // TODO: 현재는 더미 데이터 (위쪽 참고) 적용중.
    return res.status(200).json({ seats: dummyData_Seat });
  }
);

router.get(
  "/search",
  /* checkIsUser, */ (req, res, next) => {
    // TODO: 현재는 더미 데이터 (위쪽 참고) 적용중.
    const location: string | undefined = req.query.location;
    if (!location) return res.redirect("/seat");
    const trimmedLocation: string = location.trim();
    const searchedData = dummyData_Seat.filter(
      (seat) => seat.cafeName.includes(trimmedLocation) || seat.address.includes(trimmedLocation)
    );
    return res.status(200).json({ seats: searchedData });
  }
);

router.post(
  "/",
  /* checkIsUser, */ (req, res, next) => {
    // TODO: 현재는 더미 데이터 (위쪽 참고) 적용중.
    const JWT: Jwt | undefined = req.body.JWT;
    const giverId: number = JWT ? decryptJwt(JWT).id : 99;
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
    const seatStatus = 1;
    // 아래 검증은 middleware로 분리
    if (
      !leaveAt ||
      !descriptionGiver ||
      !cafeName ||
      !spaceKakaoMapId ||
      !address ||
      !geoLocation ||
      !havePlug ||
      !thumbnailUrl ||
      !descriptionSeat ||
      !descriptionCloseTime
    )
      return res.sendStatus(422);
    // TODO: User.create()
    dummyData_Seat.push({
      id: dummyDataIdx++,
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
  }
);

router.patch(
  "/:id",
  /* checkIsUser, */ (req, res, next) => {
    // TODO: 현재는 더미 데이터 (위쪽 참고) 적용중.
    const id: string = req.params.id;

    dummyData_Seat.forEach((each) => {
      if (each.id === Number(id)) {
        Object.keys(req.body).forEach((key) => {
          if (
            [
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
            ].includes(key)
          ) {
            each[key] = req.body[key];
          }
        });
      }
    });
    return res.sendStatus(204);
  }
);

router.delete("/:id", (req, res, next) => {
  // TODO: 현재는 더미 데이터 (위쪽 참고) 적용중.
  const id: string = req.params.id;
  const targetId = dummyData_Seat.findIndex((el) => el.id === Number(id));
  if (targetId === -1) return res.sendStatus(404);
  dummyData_Seat.splice(targetId, 1);
  return res.sendStatus(204);
});

export default router;
