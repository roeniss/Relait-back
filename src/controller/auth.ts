import { User } from "../db";
import { makeJwt, Jwt, JwtPayload, getDataFromJwt } from "../lib/helper";

export const login = async (user: User): Promise<Jwt> => {
  try {
    const loginUser: User | null = await User.findOne({
      where: {
        vender: user.vender,
        uniqueId: user.uniqueId,
      },
    });

    if (loginUser) {
      return makeJwt(loginUser);
    } else {
      const signupUser: User = await User.create({ vender: user.vender, uniqueId: user.uniqueId });
      return makeJwt(signupUser);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// TODO: 이 아래쪽은 추후 확인 요망
export const withdraw = async (token: Jwt): Promise<number | null> => {
  // TODO: 카카오 쪽 유저 정보도 날려야 됨. 일단은 보류
  try {
    const payload: JwtPayload | null = getDataFromJwt(token);
    if (!payload) return null;
    const condition = {
      where: {
        id: payload.id,
      },
    };
    const deletedUsersCnt: number = await User.destroy(condition);
    if (deletedUsersCnt > 0) return deletedUsersCnt;
    else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
