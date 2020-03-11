import { User } from "../db";
import { makeJwt, Jwt, JwtPayload, decryptJwt } from "../lib/helper";

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
export const withdraw = async (token: Jwt): Promise<number> => {
  // TODO: 카카오 쪽 유저 정보도 날려야 됨. 일단은 보류
  try {
    const payload: JwtPayload = decryptJwt(token);
    const deletedUsersCnt: number = await User.destroy({
      where: {
        id: payload.id,
      },
    });
    return deletedUsersCnt;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
