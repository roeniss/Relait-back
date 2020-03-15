import { User, Seat } from "./schema";
import { getOffsetTime, mysqlDateFormat } from "../lib/helper";

const users = [
  { vender: "1", uniqueId: "123456789" },
  { vender: "1", uniqueId: "1357913579" },
  { vender: "1", uniqueId: "987654321" },
];

export const addDummyData = async () => {
  await User.bulkCreate(users).then(() => {
    console.log(`[Dummy] add ${users.length} users data :`, users);
  });
  // await Seat.bulkCreate(seats).then(() => {
  //   console.log(`[Dummy] add ${seats.length} seats data :`, users);
  // });
};

const seats = [
  {
    giverId: 1,
    leaveAt: getOffsetTime(5).format(mysqlDateFormat),
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
    descriptionCloseTime: `${getOffsetTime(7).hour()}:${getOffsetTime(7).minute()}`,
  },
  {
    giverId: 2,
    leaveAt: getOffsetTime(3).format(mysqlDateFormat),
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
    descriptionCloseTime: `${getOffsetTime(5).hour()}:${getOffsetTime(5).minute()}`,
    takerId: 3,
    takenAt: getOffsetTime(-1).format(mysqlDateFormat),
  },
];
