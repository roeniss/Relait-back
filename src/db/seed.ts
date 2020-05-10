import { User, Seat } from "./schema";
import moment, { Moment } from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");
const KOREAN_OFFSET = 9;
const SEQUELIZE_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";

//
// make dummy users
//
export const userSeed: Partial<User>[] = [];
for (let i = 1; i <= 20; i++) {
  const user: Partial<User> = {
    vender: 1,
    uniqueId: i.toString(),
  };

  userSeed.push(user);
}

//
// make dummy seats
//
export const seatSeed: Partial<Seat>[] = [];

const randomSelect = (store: Array<any>, remove: boolean = false) => {
  const idx = Math.floor(Math.random() * store.length);
  const value = store[idx];
  if (remove) store.splice(idx, 1);
  return value;
};

const idStore = Array(20)
  .fill(null)
  .map((_, i) => i + 1); // [1, 2, ... 20]

const leaveAtStore = [
  moment().add("m", 5).toDate(),
  moment().add("m", 10).toDate(),
  moment().add("m", 15).toDate(),
  moment().add("m", 30).toDate(),
];

const descriptionGiverStore = [
  "백글자 짜리 기버 설명입니다 룰루랄라 백글자 짜리 기버 설명입니다 룰루랄라 백글자 짜리 기버 설명입니다 룰루랄라 백글자 짜리 기버 설명입니다 룰루랄라 백글자 짜리 기버 설명입니다!",
  "오십글자 짜리 기버 설명입니다 빠밤 오십글자 짜리 기버 설명입니다 빠밤 오십글자짜리 설명!",
  "열 글자 짜리 설명",
  null,
];

const cafeStore = [
  {
    cafeName: "나무카페",
    spaceKakaoMapId: 20526285,
    address: "서울 서대문구 명물길 2",
    lat: 37.5571526,
    lng: 126.9353874,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F9D0AB7C358024DDB83EE2EB323358C64",
  },
  {
    cafeName: "커피DZ 신촌점",
    spaceKakaoMapId: 27452434,
    address: "서울 서대문구 연세로5나길 14",
    lat: 37.5571526,
    lng: 126.9353874,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FFDBB10FDA563474797F3DDE4BD3AE68C",
  },
  {
    cafeName: "파파",
    spaceKakaoMapId: 8581817,
    address: "서울 서대문구 연세로5길 28",
    lat: 37.5571526,
    lng: 126.9353874,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F043FE0F90C034C939E39FA6698FADF1B",
  },
  {
    cafeName: "더파이홀",
    spaceKakaoMapId: 1011256721,
    address: "서울 서대문구 연세로5나길 20",
    lat: 37.5571526,
    lng: 126.9353874,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FEEFADF7FA59344D6BF1BA630C8E8E9AE",
  },
  {
    cafeName: "투썸플레이스 신촌점",
    spaceKakaoMapId: 11221603,
    address: "서울 서대문구 신촌로 93 1층",
    lat: 37.5571526,
    lng: 126.9353874,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F5026B83C0E274FA19A3106E1E471036C",
  },
  {
    cafeName: "탐앤탐스 신촌로터리점",
    spaceKakaoMapId: 17126983,
    address: "서울 서대문구 신촌로 109 1,2층",
    lat: 37.5562675,
    lng: 126.9365126,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F3089C94DE41C4EA19B418C53B09EECF6",
  },
  {
    cafeName: "커피빈 신촌점",
    spaceKakaoMapId: 10821672,
    address: "서울 서대문구 연세로 8-1 지하 1층",
    lat: 37.5562987,
    lng: 126.9367328,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F5C461832F59E47578401142769B00021",
  },
  {
    cafeName: "스타벅스 신촌점",
    spaceKakaoMapId: 10538396,
    address: "서울 서대문구 연세로 10-1 즐거운빌딩 1,2,3층",
    lat: 37.5565226,
    lng: 126.9367379,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F2607E64D55E006CD24",
  },
  {
    cafeName: "콩",
    spaceKakaoMapId: "신촌카페콩",
    address: "서울 서대문구 연세로4길 24",
    lat: 37.5565268,
    lng: 126.9367379,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F2224753B5582793110",
  },
  {
    cafeName: "에이투지카페",
    spaceKakaoMapId: 23966590,
    address: "서울 중구 세종대로 136",
    lat: 37.5565268,
    lng: 126.9367379,
    thumbnailUrl:
      "https://img1.daumcdn.net/thumb/T736x736.q70/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F294AD9E14EB745339FC08A053252FF71",
  },
];

const havePlugStore = [true, false];

const descriptionSeatStore = [
  "백글자 짜리 자리 설명입니다 룰루랄라 백글자 짜리 자리 설명입니다 룰루랄라 백글자 짜리 자리 설명입니다 룰루랄라 백글자 짜리 자리 설명입니다 룰루랄라 백글자 짜리 자리 설명입니다!",
  "오십글자 짜리 자리 설명입니다 빠밤 오십글자 짜리 자리 설명입니다 빠밤 오십글자짜리 설명!",
  "열 글자 짜리 설명",
];

const descriptionCloseTimeStore = [
  moment().add("h", 1).toDate(),
  moment().add("h", 3).toDate(),
  moment().add("h", 5).toDate(),
  null,
];

const takenAtStore = [
  moment().add("m", 5).toDate(),
  moment().add("m", 15).toDate(),
  moment().add("m", 30).toDate(),
];

const randomTaker = (giverId: number) => {
  if (Math.random() >= 0.5) return { takerId: null, takenAt: null };
  else {
    let takerId = giverId + Math.floor(Math.random() * 10);
    if (takerId > 20) takerId -= 20;
    return {
      takerId,
      takenAt: randomSelect(takenAtStore),
    };
  }
};

for (let i = 1; i <= 20; i++) {
  const giverId = randomSelect(idStore, true);
  const seat: Partial<Seat> = {
    giverId,
    leaveAt: randomSelect(leaveAtStore),
    descriptionGiver: randomSelect(descriptionGiverStore),
    seatStatus: 1,
    ...randomSelect(cafeStore),
    havePlug: randomSelect(havePlugStore),
    descriptionSeat: randomSelect(descriptionSeatStore),
    descriptionCloseTime: randomSelect(descriptionCloseTimeStore),
    ...randomTaker(giverId),
  };
  seatSeed.push(seat);
  /*
  // 조합을 따져보자
  giverId
  leaveAt: 5분 10분 15분 30분
  descriptionGiver: 백글자 오십글자 다섯글자 없음
  seatStatus : 1 (현재는 활용 X...)
  cafeName, spaceKakaoMapId, address, lat, lng: 카페 열 군데 정도?
  havePlug: Y/N
  thumbnailUrl : 카카오 공식 or 없음 (cafeStore에 같이 저장)
  descriptionSeat : 백글자 오십글자 다섯글자
  descriptionCloseTime : 한시간 뒤, 세시간 뒤, 다섯 시간 뒤, X
  takerId, takenAt : O / X --> if(O) 5분뒤 15분뒤 30분뒤
  */
}
