import { User, Seat } from "../db";
import { Jwt, decryptJwt, JwtPayload } from "../lib/helper";

export const haveSeat = async (token: Jwt): Promise<Seat | null> => {
  try {
    const payload: JwtPayload = decryptJwt(token);
    // const seat: Seat | null = await Seat.findOne({
    //   where: {
    //     giverId: payload.id,
    //     createdAt: []

    //   },
    // });
    // TODO: 아래는 임시 더미 데이터임
    console.log(payload);

    if (payload.id === 1) {
      return <Seat>{
        id: 1,
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
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
};
